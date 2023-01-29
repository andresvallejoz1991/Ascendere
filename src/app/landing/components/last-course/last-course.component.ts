import { Component } from '@angular/core';
import { CursosService } from 'src/app/core/services/formacion/cursos.service';

@Component({
  selector: 'ascendere-last-course',
  templateUrl: './last-course.component.html',
  styles: [
  ]
})
export class LastCourseComponent {

  constructor(
    private readonly cursosService: CursosService,
  ) { }

  cursos$ = this.cursosService.getLatestCourse$();
}
