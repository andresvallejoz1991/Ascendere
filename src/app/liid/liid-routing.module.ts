import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboratorioComponent } from './laboratorio/laboratorio.component';
import { RecursosComponent } from './recursos/recursos.component';

const routes: Routes = [
  { path: 'laboratorio', component: LaboratorioComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: '**', redirectTo: 'laboratorio' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiidRoutingModule {
  static pages = [
    LaboratorioComponent,
    RecursosComponent,
  ];
}
