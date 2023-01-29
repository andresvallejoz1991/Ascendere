import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppResolver } from './app.resolver';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  /// custom pages
  { path: '', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule), },
  { path: 'acerca-de', loadChildren: () => import('./about/about.module').then(m => m.AboutModule), },
  { path: 'liid', loadChildren: () => import('./liid/liid.module').then(m => m.LiidModule), },
  { path: 'podcasts', loadChildren: () => import('./podcasts/podcasts.module').then(m => m.PodcastsModule), },
  { path: 'webinars', loadChildren: () => import('./webinars/webinars.module').then(m => m.WebinarsModule), },
  { path: 'innovacion-docente', loadChildren: () => import('./innovacion/innovacion.module').then(m => m.InnovacionModule), },
  { path: 'formacion', loadChildren: () => import('./formacion/formacion.module').then(m => m.FormacionModule), },
  { path: 'noticias', loadChildren: () => import('./noticias/noticias.module').then(m => m.NoticiasModule), },
  { path: 'encuentros', loadChildren: () => import('./encuentros/encuentros.module').then(m => m.EncuentrosModule), },
  { path: 'jornadas', loadChildren: () => import('./jornadas/jornadas.module').then(m => m.JornadasModule), },
  { path: 'visibilizacion', loadChildren: () => import('./visibilizacion/visibilizacion.module').then(m => m.VisibilizacionModule), },

  /// default router
  { path: '**',  component: PageNotFoundComponent, resolve: {AppResolver} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'disabled', paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
