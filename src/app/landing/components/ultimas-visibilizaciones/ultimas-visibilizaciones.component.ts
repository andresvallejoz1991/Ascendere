import { Component } from '@angular/core';
import { VisibilizacionService } from 'src/app/visibilizacion/visibilizacion.service';

@Component({
  selector: 'ascendere-ultimas-visibilizaciones',
  templateUrl: './ultimas-visibilizaciones.component.html',
  styles: [
  ]
})
export class UltimasVisibilizacionesComponent{

  constructor(
    private readonly visibilizacionService: VisibilizacionService
  ) { }

  videos1$ = this.visibilizacionService.getLatestVisibilizacion$();
  videos2$ = this.visibilizacionService.getLatestVisibilizacion2$();

}
