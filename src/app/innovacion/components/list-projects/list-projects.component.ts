import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { ProyectoDto } from 'src/app/core/services/innovacion/projecto.dto';
import { ProyectosInnovacionService } from 'src/app/core/services/innovacion/proyectos-innovacion.service';
import { ProyectosTypes } from 'src/app/core/services/innovacion/proyectos-types';
import { PaginatorService } from 'src/app/core/services/utils/paginator.service';
import { IRequest } from 'src/app/core/services/utils/request.interface';
import { SearchQueryService } from 'src/app/core/services/utils/search-query.service';

@Component({
  selector: 'ascendere-list-projects',
  templateUrl: './list-projects.component.html',
  styles: [
  ]
})
export class ListProjectsComponent {

  constructor(
    private route: ActivatedRoute,
    private proyectosService: ProyectosInnovacionService,
    private paginatorService: PaginatorService,
    private searchQueryService: SearchQueryService,
  ) { }

  public readonly proyectosTypes = ProyectosTypes;

  /// SOURCE OF PROJECTS
  proyectosSource$: Observable<IRequest<ProyectoDto[]>> = this.route.queryParams.pipe(
    map(query => query['key'] ?? null),
    distinctUntilChanged(),
    switchMap(key => this.proyectosService.getProyectos$(key)),
    shareReplay(1),
  );

  /// PROJECTS TO SHOW
  proyectos$ = combineLatest(this.proyectosSource$, this.searchQueryService.query$, this.route.queryParams).pipe(
    map(([proyectos, query, queryParams]) => {
      const copy: { data: ProyectoDto[] | null; loading: boolean; error: any; } = { ...proyectos };
      if (copy.data) {
        const queryStrategicLine = queryParams['strategicLine'] ?? null;
        const queryFacultades = queryParams['facultades'] ?? null;
        const queryCoordinador = queryParams['coordinador'] ?? null;

        copy.data = copy.data!.filter(p => {
          let validProject = true;
          if (!!query) {
            validProject = validProject && p.title.toLowerCase().includes(query.toLowerCase() ?? '')
              || p.coordinator.name.toLowerCase().includes(query.toLowerCase() ?? '');
          }

          /// filter by strategic line
          if (queryStrategicLine) {
            const strategicLine = typeof p.strategicLine === 'object'
              ? (p.strategicLine.label ?? p.strategicLine.name)
              : p.strategicLine;
            validProject = validProject && strategicLine?.trim() === queryStrategicLine;
          }

          if (queryFacultades) {
            validProject = validProject && !!p.faculties?.some(f => f.name.toUpperCase().includes(queryFacultades.toUpperCase()));
          }

          if (queryCoordinador) {
            validProject = validProject && !!p.coordinator?.name.toUpperCase().includes(queryCoordinador.toUpperCase());
          }
          return validProject;
        });
      }
      return copy;
    }),
    tap(({ data }) => data ? this.paginatorService.setTotal(data.length) : null),
    shareReplay(1),
    switchMap(proyectos => combineLatest(of(proyectos), this.paginatorService.paginator$)),
    map(([proyectos, paginator]) => {
      const copy = { ...proyectos };
      if (copy.data)
        copy.data = copy.data.slice(paginator.offset, paginator.offset + 6)
      return copy;
    }),

  );

  strategicLines$: Observable<string[]> = this.proyectosSource$.pipe(
    map(projects => [...projects.data ?? []]),
    map(projects => projects.map(({ strategicLine: s }) => typeof s === 'object' ? s.label ?? s.name ?? null : s)),
    map(labels => labels.filter(l => !!l) as string[]),
    map(labels => labels.map(l => l.trim())),
    map(labels => labels.filter((item, index) => labels.indexOf(item) === index)),
    map(labels => labels.sort())
  );

  facultades$: Observable<string[]> = this.proyectosSource$.pipe(
    map(projects => [...projects.data ?? []]),
    map(projects => projects.map(({ faculties: s }) => s).flat().map(f => f?.name)),
    map(labels => labels.filter(l => !!l) as string[]),
    map(labels => labels.map(l => l.trim())),
    map(labels => labels.filter((item, index) => labels.indexOf(item) === index)),
    map(labels => labels.sort())
  );

  coordinador$: Observable<string[]> = this.proyectosSource$.pipe(
    map(projects => [...projects.data ?? []]),
    map(projects => projects.map(({ coordinator: s }) => s).map(f => f?.name)),
    map(labels => labels.filter(l => !!l) as string[]),
    map(labels => labels.map(l => l.trim())),
    map(labels => labels.filter((item, index) => labels.indexOf(item) === index)),
    map(labels => labels.sort())
  );


}
