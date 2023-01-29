import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncuentrosComponent } from './encuentros.component';
import { ViewEncuentroComponent } from './view-encuentro/view-encuentro.component';

const routes: Routes = [
  { path: '', component: EncuentrosComponent, },
  { path: ':key/:id', component: ViewEncuentroComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuentrosRoutingModule {
  static pages = [EncuentrosComponent];
}
