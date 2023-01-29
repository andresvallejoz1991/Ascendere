import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Observable, of, shareReplay, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  public paginator$: Observable<{ offset: number, total: number }> = this.route.queryParams.pipe(
    map(params => ({ offset: parseInt(params['offset'] ?? 0), total: parseInt(params['total'] ?? 0) })),
    distinctUntilChanged((prev, curr) => prev.offset === curr.offset && prev.total === curr.total),
    shareReplay(1),
  );

  canGoForward$ = this.paginator$.pipe(
    map(paginator => paginator.offset <= paginator.total - 6),
  );

  canGoBackward$ = this.paginator$.pipe(
    map(paginator => paginator.offset > 0),
  );

  setTotal(total: number) {
    const prevTotal = parseInt(this.route.snapshot.queryParams['total']);
    const offset = prevTotal === total ? parseInt(this.route.snapshot.queryParams['offset']) : 0;
    this.router.navigate([], { relativeTo: this.route, queryParams: { ...this.route.snapshot.queryParams, offset, total } })
  }

  nextPage() {
    this.canGoForward$.pipe(
      switchMap(canGoBackward => canGoBackward ? this.paginator$ : of(null)),
      take(1),
    ).subscribe(paginator => {
      if (paginator)
        this.router.navigate([], {
          relativeTo: this.route, queryParams:
          {
            ...this.route.snapshot.queryParams,
            offset: paginator.offset + 6, total: paginator.total
          }
        });
    });
  }

  prevPage() {
    this.canGoBackward$.pipe(
      switchMap(canGoBackward => canGoBackward ? this.paginator$ : of(null)),
      take(1),
    ).subscribe(paginator => {
      if (paginator)
        this.router.navigate([], {
          relativeTo: this.route, queryParams:
          {
            ...this.route.snapshot.queryParams,
            offset: paginator.offset - 6, total: paginator.total
          }
        });
    });

  }


}
