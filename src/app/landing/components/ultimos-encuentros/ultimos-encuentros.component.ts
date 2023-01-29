import { Component } from '@angular/core';
import { EncuentrosService } from 'src/app/core/services/encuentros/encuentros.service';

@Component({
  selector: 'ascendere-ultimos-encuentros',
  templateUrl: './ultimos-encuentros.component.html',
  styles: [
  ]
})
export class UltimosEncuentrosComponent {

  constructor(
    private readonly encuentrosService: EncuentrosService,
  ) { }

  encuentros$ = this.encuentrosService.getLatestEncuentros$();

}
