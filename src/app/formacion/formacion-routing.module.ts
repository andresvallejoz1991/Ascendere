import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AscendereCampComponent } from './ascendere-camp/ascendere-camp.component';
import { CursosEspecificosComponent } from './cursos-especificos/cursos-especificos.component';
import { FormacionComponent } from './formacion.component';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';
import { ViewCourseComponent } from './view-course/view-course.component';

const routes: Routes = [
  { path: '', component: FormacionComponent, },
  { path: 'cursos-especificos', component: CursosEspecificosComponent, },
  { path: 'campamento-ascendere', component: AscendereCampComponent, },
  {
    path: 'curso/:id', component: ViewCourseComponent,
    children: [
      { path: 'inscripcion', component: InscriptionFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormacionRoutingModule {
  static pages = [
    FormacionComponent,
    CursosEspecificosComponent,
    ViewCourseComponent,
    AscendereCampComponent,
    InscriptionFormComponent,
  ];
}
