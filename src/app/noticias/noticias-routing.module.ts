import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoticiasComponent } from './noticias.component';
import { ViewNoticiaComponent } from './view-noticia/view-noticia.component';

const routes: Routes = [
  { path: '', component: NoticiasComponent, },
  { path: ':id', component: ViewNoticiaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiasRoutingModule { }
