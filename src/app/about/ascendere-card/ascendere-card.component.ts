import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascendere-ascendere-card',
  templateUrl: './ascendere-card.component.html',
  styles: [
  ]
})
export class AscendereCardComponent {

  constructor() { }

  @Input('imageSrc')
  _imageSrc: string | null = null;

  get imageSrc(): string {
    if (this._imageSrc === null)
      throw new Error('Required param imageSrc')
    return this._imageSrc;
  }

  @Input('title')
  _title: string | null = null;

  get title(): string {
    if (this._title === null)
      throw new Error('Required param title')
    return this._title;
  }

  @Input('description')
  _description: string | null = null;

  get description(): string {
    if (this._description === null)
      throw new Error('Required param description')
    return this._description;
  }

  @Input('linkTo')
  _routerLink: Array<any> | string | null = null;

  get routerLink(): Array<any> | string {
    if (this._routerLink === null)
      throw new Error('Required param routerLink')
    return this._routerLink;
  }

  @Input()
  queryParams: Object | null = null;

}
