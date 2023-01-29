import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { VisibilizacionRoutingModule } from './visibilizacion-routing.module';
import { VisibilizacionComponent } from './visibilizacion.component';

@NgModule({
  declarations: [
    VisibilizacionRoutingModule.pages,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VisibilizacionRoutingModule
  ]
})
export class VisibilizacionModule { }
