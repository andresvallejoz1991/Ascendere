import { NgModule } from '@angular/core';
import { ArticleService } from './articles/article.service';
import { AuthenticationService } from './auth/authentication.service';
import { EncuentrosService } from './encuentros/encuentros.service';
import { CursosService } from './formacion/cursos.service';
import { ProyectosInnovacionService } from './innovacion/proyectos-innovacion.service';
import { NewsServiceService } from './news';
import { PodcastsService } from './podcasts';
import { RecursosService } from './recursos/recursos.service';
import { ScheduleService } from './schedule/schedule.service';
import { SidebarService } from './utils/navigation.service';

@NgModule({
  providers: [
    NewsServiceService,
    PodcastsService,
    AuthenticationService,
    SidebarService,
    EncuentrosService,
    CursosService,
    ArticleService,
    ProyectosInnovacionService,
    RecursosService,
    ScheduleService,
  ],
})
export class ServicesModule { }
