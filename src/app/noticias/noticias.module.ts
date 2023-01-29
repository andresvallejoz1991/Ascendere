import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { NoticiasComponent } from './noticias.component';
import { ViewNoticiaComponent } from './view-noticia/view-noticia.component';



@NgModule({
  declarations: [
    ViewNoticiaComponent,
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    SharedModule,
  ]
})
export class NoticiasModule { }
