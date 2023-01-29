import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudantesCatedraComponent } from './ayudantes-catedra/ayudantes-catedra.component';
import { ListProjectsComponent } from './components/list-projects/list-projects.component';
import { InnovacionComponent } from './innovacion.component';
import { ViewProjectComponent } from './view-project/view-project.component';

const routes: Routes = [
  { path: '', component: InnovacionComponent },
  { path: 'proyecto/:id', component: ViewProjectComponent },
  { path: 'ayudantes-de-catedra', component: AyudantesCatedraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnovacionRoutingModule {
  static pages = [
    InnovacionComponent,
    AyudantesCatedraComponent,
    ListProjectsComponent,
    ViewProjectComponent
  ];
}
