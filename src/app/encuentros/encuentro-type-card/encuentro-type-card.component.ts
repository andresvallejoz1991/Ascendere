import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascendere-encuentro-type-card',
  templateUrl: './encuentro-type-card.component.html',
  styles: [
  ]
})
export class EncuentroTypeCardComponent {

  @Input('title')
  _title: string | null = null;

  get title() {
    if (this._title === null)
      throw new Error('missing property title');
    return this._title;
  }

  @Input('assetSource')
  _assetSource: string | null = null;

  get assetSource() {
    if (this._assetSource === null)
      throw new Error('missing property assetSource');
    return this._assetSource;
  }

  @Input('key')
  _key: string | null = null;

  get key() {
    if (this._key === null)
      throw new Error('missing property key');
    return this._key;
  }

  @Input()
  active: boolean = false;
}
