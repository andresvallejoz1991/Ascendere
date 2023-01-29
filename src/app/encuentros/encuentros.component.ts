import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { EncuentroDto } from '../core/services/encuentros/encuentros.dto';
import { EncuentrosService } from '../core/services/encuentros/encuentros.service';
import { PaginatorService } from '../core/services/utils/paginator.service';
import { IRequest } from '../core/services/utils/request.interface';
import { SearchQueryService } from '../core/services/utils/search-query.service';

@Component({
  selector: 'ascendere-encuentros',
  templateUrl: './encuentros.component.html',
  styles: [
  ]
})
export class EncuentrosComponent {

  constructor(
    private readonly encuentrosService: EncuentrosService,
    private readonly router: ActivatedRoute,
    private paginatorService: PaginatorService,
    private searchQueryService: SearchQueryService,
  ) { }

  eTypes = this.encuentrosService.types;

  activeType$: Observable<string> = this.router.queryParams.pipe(
    map(q => q['key'] ?? this.eTypes[0].key),
    distinctUntilChanged(),
  );

  encuentrosSource$: Observable<IRequest<Array<EncuentroDto>>> = this.activeType$.pipe(
    switchMap(keyType => this.encuentrosService.getEncuentrosOfType$(keyType)),
    shareReplay(1),
  );

  encuentros$ = combineLatest(this.encuentrosSource$, this.searchQueryService.query$).pipe(
    map(([encuentros, query]) => {
      const copy = { ...encuentros };
      if (copy.data)
        copy.data = copy.data!.filter(p => p.title.toLowerCase().includes(query?.toLowerCase() ?? ''))
      return copy;
    }),
    tap(({ data }) => data ? this.paginatorService.setTotal(data.length) : null),
    shareReplay(1),
    switchMap(encuentros => combineLatest(of(encuentros), this.paginatorService.paginator$)),
    map(([encuentros, paginator]) => {
      const copy = { ...encuentros };
      if (copy.data)
        copy.data = copy.data.slice(paginator.offset, paginator.offset + 6)
      return copy;
    })
  );


}
