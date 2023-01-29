import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import { PaginatorService } from 'src/app/core/services/utils/paginator.service';
import { SearchQueryService } from 'src/app/core/services/utils/search-query.service';

@Component({
  selector: 'ascendere-search-input',
  templateUrl: './search-input.component.html',
  styles: [
  ]
})
export class SearchInputComponent implements OnInit, OnDestroy {

  constructor(
    private readonly fb: FormBuilder,
    private readonly searchQueryService: SearchQueryService,
    private readonly paginatorService: PaginatorService,
  ) { }

  searchForm: FormGroup = this.fb.group({
    searchInput: this.fb.control(null)
  })

  searchSub: Subscription | null = null;
  updateInputSub: Subscription | null = null;

  query$ = this.searchForm.valueChanges.pipe(
    map(value => value.searchInput),
    distinctUntilChanged(),
  );

  totalResults$ = this.paginatorService.paginator$.pipe(
    map(paginator => paginator.total)
  );

  ngOnInit(): void {
    this.updateInputSub = this.searchQueryService.query$.subscribe(searchInput =>
      this.searchForm.setValue({ searchInput }, { emitEvent: false })
    );
    this.searchSub = this.query$.subscribe(query => this.searchQueryService.updateQuery(query));
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
    this.updateInputSub?.unsubscribe();
  }

}
