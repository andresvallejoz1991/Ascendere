import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'ascendere-dropdown-option',
  templateUrl: './dropdown-option.component.html',
  styles: [
  ]
})
export class DropdownOptionComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  @Input('label')
  label: string | null = null;

  @Input('key')
  _key: string | null = null;

  get key(): string {
    if (!this._key)
      throw new Error("Key not found");

    return this._key;
  }

  isActive = this.route.queryParams.pipe(
    map(query => query[this.key] ?? null),
    distinctUntilChanged(),
    map(currVal => this.label && currVal === this.label),
  );

  setKey() {
    this.router.navigate([], { relativeTo: this.route, queryParams: { ...this.route.snapshot.queryParams, [this.key]: this.label } })
  }
}
