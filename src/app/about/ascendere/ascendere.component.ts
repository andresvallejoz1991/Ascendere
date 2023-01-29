import { Component } from '@angular/core';
import { EncuentrosService } from 'src/app/core/services/encuentros/encuentros.service';

@Component({
  selector: 'ascendere-ascendere',
  templateUrl: './ascendere.component.html',
  styles: [
  ]
})
export class AscendereComponent {

  constructor(
    private readonly encuentrosService: EncuentrosService,
  ) { }

  encuentrosTypes = this.encuentrosService.types;

}
