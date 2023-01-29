import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LastCourseComponent } from './components/last-course/last-course.component';
import { RecentNewsGridComponent } from './components/recent-news-grid/recent-news-grid.component';
import { UltimosProyectosComponent } from './components/ultimos-proyectos/ultimos-proyectos.component';
import { LandingRoutingModule } from './landing-routing.module';
import { UltimosEncuentrosComponent } from './components/ultimos-encuentros/ultimos-encuentros.component';
import { UltimosWebinarsComponent } from './components/ultimos-webinars/ultimos-webinars.component';
import { AgendaComponent } from './agenda/agenda.component';
import { RecentPodcastsComponent } from './recent-podcasts/recent-podcasts.component';
import { UltimasVisibilizacionesComponent } from './components/ultimas-visibilizaciones/ultimas-visibilizaciones.component';
import { WhitoutCoursesComponent } from './components/whitout-courses/whitout-courses/whitout-courses.component';



@NgModule({
  declarations: [
    ...LandingRoutingModule.pages,
    RecentNewsGridComponent,
    LastCourseComponent,
    UltimosProyectosComponent,
    UltimosEncuentrosComponent,
    UltimosWebinarsComponent,
    AgendaComponent,
    RecentPodcastsComponent,
    UltimasVisibilizacionesComponent,
    WhitoutCoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LandingRoutingModule
  ]
})
export class LandingModule { }
