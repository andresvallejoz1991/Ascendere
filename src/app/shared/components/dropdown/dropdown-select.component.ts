import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'ascendere-dropdown-select',
  templateUrl: './dropdown-select.component.html',
})
export class DropdownSelectComponent {

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  @Input('label')
  _label: string = "Selecciona una opción";

  @Input('key')
  _key: string | null = null;

  get key(): string {
    if (!this._key)
      throw new Error("Key not found");

    return this._key;
  }

  isOpen = false;

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  label = this.route.queryParams.pipe(
    map(query => query[this.key]),
    map(curVal => curVal ?? this._label),
    tap(() => this.close()),
    distinctUntilChanged(),
  );
}
