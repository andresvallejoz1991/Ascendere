import { Component, Input } from '@angular/core';

@Component({
  selector: 'ascendere-circle-icon',
  templateUrl: './ascendere-circle-icon.component.html',
})
export class AscendereCircleIconComponent {

  @Input('src')
  imgSrc: string = '';

  @Input('alt')
  altText: string = '';

  @Input()
  bigBorders = false;

}
