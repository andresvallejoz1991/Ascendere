import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { LandingComponent } from './landing.component';
import { RecentPodcastsComponent } from './recent-podcasts/recent-podcasts.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'agenda',
        component: AgendaComponent,
      },
      {
        path: 'podcasts-recientes',
        component: RecentPodcastsComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
  static pages = [
    LandingComponent,
    AgendaComponent,
    RecentPodcastsComponent
  ]
}
