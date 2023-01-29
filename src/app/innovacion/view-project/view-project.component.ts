import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProyectosInnovacionService } from 'src/app/core/services/innovacion/proyectos-innovacion.service';

@Component({
  selector: 'ascendere-view-project',
  templateUrl: './view-project.component.html',
  styles: [
  ]
})
export class ViewProjectComponent {


  constructor(
    private route: ActivatedRoute,
    private proyectosService: ProyectosInnovacionService,
  ) { }


  proyecto$ = this.route.params.pipe(
    switchMap(params => {
      if (params['id'])
        return this.proyectosService.getProyecto$(params['id']);
      throw new Error("");
    }),
  );


}
