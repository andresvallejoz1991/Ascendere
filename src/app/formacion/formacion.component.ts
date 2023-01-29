import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { CursoDto } from '../core/services/formacion/curso.dto';
import { CursosService } from '../core/services/formacion/cursos.service';
import { PaginatorService } from '../core/services/utils/paginator.service';
import { IRequest } from '../core/services/utils/request.interface';
import { SearchQueryService } from '../core/services/utils/search-query.service';
@Component({
  selector: 'ascendere-formacion',
  templateUrl: './formacion.component.html'
})
export class FormacionComponent {

  constructor(
    private readonly cursosService: CursosService,
    private paginatorService: PaginatorService,
    private searchQueryService: SearchQueryService,
    private route: ActivatedRoute,
  ) { }

  cursosSource$ = this.cursosService.getCursos$().pipe(
    shareReplay(1),
  );

  cursos$ = combineLatest(this.cursosSource$, this.searchQueryService.query$, this.route.queryParams).pipe(
    map(([cursos, query, queryParams]) => {

      const copy: IRequest<Array<CursoDto>> = { ...cursos };
      if (copy.data) {
        const queryItineraries = queryParams['itinerary'] ?? null;
        copy.data = copy.data!.filter(p => {
          let validProject = p.title?.toLowerCase().includes(query?.toLowerCase() ?? '')
            || p.description?.toLowerCase().includes(query?.toLowerCase() ?? '')
            || p.instructors?.some(i => i.name?.toLowerCase().includes(query?.toLowerCase() ?? ''));

          /// filter by strategic line
          if (queryItineraries)
            validProject = validProject && !!p.itinerary && (p.itinerary.trim() === queryItineraries);
          return validProject;
        });
      }
      return copy;
    }),
    tap(({ data }) => data ? this.paginatorService.setTotal(data.length) : null),
    shareReplay(1),
    switchMap(cursos => combineLatest(of(cursos), this.paginatorService.paginator$)),
    map(([cursos, paginator]) => {
      const copy = { ...cursos };
      if (copy.data)
        copy.data = copy.data.slice(paginator.offset, paginator.offset + 6)
      return copy;
    })
  );


  canInscribe(date?: Date): boolean {
    const today = new Date();
    return date ? today.getTime() < date.getTime() : false;
  }
  ongoing(start?: Date, end?: Date): boolean {
    const today = new Date();
    if (!start || !end)
      return false;

    return today > start && today < end
  }

  itineraries$: Observable<Array<string>> = this.cursosSource$.pipe(
    map(courses => [...(courses.data ?? [])]),
    map(courses => courses.map(({ itinerary }) => itinerary?.trim() ?? null)),
    map(itineraries => itineraries.filter(i => !!i) as string[]),
    map(itineraries => itineraries.filter((item, index) => itineraries.indexOf(item) === index)),
    map(itineraries => itineraries.sort()),
  );
}
