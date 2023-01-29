import { Component, Input } from '@angular/core';
import { ProyectoDto } from 'src/app/core/services/innovacion/projecto.dto';

@Component({
  selector: 'ascendere-project-card',
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input('proyecto')
  _projectData: ProyectoDto | null = null;

  get proyecto(): ProyectoDto {
    if (this._projectData === null)
      throw new Error("Missing property proyecto");
    return this._projectData;
  }
}
