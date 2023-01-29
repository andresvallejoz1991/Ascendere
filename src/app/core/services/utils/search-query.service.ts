import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchQueryService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  query$: Observable<string | null> = this.route.queryParams.pipe(
    map(q => q['query'] ?? null),
    distinctUntilChanged(),
    shareReplay(1),
  );

  updateQuery(q: string) {
    let query = !!q ? q : null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...this.route.snapshot.queryParams, query }
    });

  }
}
