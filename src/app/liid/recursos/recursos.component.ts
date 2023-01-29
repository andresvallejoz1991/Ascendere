import { Component } from '@angular/core';
import { RecursosService } from 'src/app/core/services/recursos/recursos.service';

@Component({
  selector: 'ascendere-recursos',
  templateUrl: './recursos.component.html',
  styles: [
  ]
})
export class RecursosComponent {

  constructor(
    private readonly recursosService: RecursosService,
  ) { }

  recursos$ = this.recursosService.getRecursos$();

}
