import { Component, OnInit } from '@angular/core';
import { CursosService } from 'src/app/core/services/formacion/cursos.service';

@Component({
  selector: 'ascendere-whitout-courses',
  templateUrl: './whitout-courses.component.html',
  styles: [
  ]
})
export class WhitoutCoursesComponent {

  constructor(
    private readonly cursosService: CursosService,
  ) { }

  cursos$ = this.cursosService.getLatestCourse$();
}
