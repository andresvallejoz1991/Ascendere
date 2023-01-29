import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'ascendere-project-type-card',
  templateUrl: './project-type-card.component.html',
})
export class ProjectTypeCardComponent {

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

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

  @Input('description')
  _description: string | null = null;

  get description() {
    if (this._description === null)
      throw new Error('missing property description');
    return this._description;
  }

  active$: Observable<boolean> = this.route.queryParams.pipe(
    map(query => query['key'] === this.key),
  );
}