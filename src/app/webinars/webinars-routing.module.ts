import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { WebinarsComponent } from './webinars.component';

const routes: Routes = [
  {
    path: '', component: WebinarsComponent, children: [
      { path: ':id', component: PlayerComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebinarsRoutingModule {
  static pages = [
    WebinarsComponent,
    PlayerComponent,
  ]
}
