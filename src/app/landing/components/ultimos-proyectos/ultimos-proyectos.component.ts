import { Component } from '@angular/core';
import { ProyectosInnovacionService } from 'src/app/core/services/innovacion/proyectos-innovacion.service';

@Component({
  selector: 'ascendere-ultimos-proyectos',
  templateUrl: './ultimos-proyectos.component.html',
  styles: [
  ]
})
export class UltimosProyectosComponent {

  constructor(
    private proyectosService: ProyectosInnovacionService,
  ) { }

  proyectos$ = this.proyectosService.getLatestProyectos$();
}
