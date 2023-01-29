import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisibilizacionComponent } from './visibilizacion.component';
import { PlayerVisibilizacionComponent } from './player-visibilizacion/player-visibilizacion.component';

const routes: Routes = [
  {
    path: '', component: VisibilizacionComponent, children: [
      { path: ':id', component: PlayerVisibilizacionComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisibilizacionRoutingModule {
  static pages = [
    VisibilizacionComponent,
    PlayerVisibilizacionComponent,
  ]
 }
