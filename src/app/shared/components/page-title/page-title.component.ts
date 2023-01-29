import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascendere-page-title',
  templateUrl: './page-title.component.html',
  styles: [
  ]
})
export class PageTitleComponent {

  constructor(
    private location: Location
  ) { }

  @Input()
  showBackButton: boolean = false;

  back(): void {
    this.location.back()
  }

}
