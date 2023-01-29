import { Component } from '@angular/core';
import { combineLatest, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { NewsServiceService } from '../core/services/news';
import { PaginatorService } from '../core/services/utils/paginator.service';
import { SearchQueryService } from '../core/services/utils/search-query.service';

@Component({
  selector: 'ascendere-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent {

  constructor(
    private readonly newsService: NewsServiceService,
    private paginatorService: PaginatorService,
    private searchQueryService: SearchQueryService,
  ) { }

  newsSource$ = this.newsService.getNews$().pipe(
    shareReplay(1),
  );

  news$ = combineLatest(this.newsSource$, this.searchQueryService.query$).pipe(
    map(([news, query]) => {
      const copy = { ...news };
      if (copy.data)
        copy.data = copy.data!.filter(p => p?.title.toLowerCase().includes(query?.toLowerCase() ?? ''))
      return copy;
    }),
    tap(({ data }) => data ? this.paginatorService.setTotal(data.length) : null),
    shareReplay(1),
    switchMap(news => combineLatest(of(news), this.paginatorService.paginator$)),
    map(([news, paginator]) => {
      const copy = { ...news };
      if (copy.data)
        copy.data = copy.data.slice(paginator.offset, paginator.offset + 6)
      return copy;
    })
  );


}
