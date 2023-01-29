import { Component } from '@angular/core';
import { PaginatorService } from 'src/app/core/services/utils/paginator.service';

@Component({
  selector: 'ascendere-pagination-navigation',
  templateUrl: './pagination-navigation.component.html',
  styles: [
  ]
})
export class PaginationNavigationComponent {

  constructor(
    private paginatorService: PaginatorService,
  ) { }

  paginator$ = this.paginatorService.paginator$;

  /// PAGINATOR FUNCTIONS
  canGoForward$ = this.paginatorService.canGoForward$;
  canGoBackward$ = this.paginatorService.canGoBackward$;
  nextPage = () => this.paginatorService.nextPage();
  prevPage = () => this.paginatorService.prevPage();
}
