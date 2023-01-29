import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormacionRoutingModule } from './formacion-routing.module';



@NgModule({
  declarations: [
    FormacionRoutingModule.pages,
  ],
  imports: [
    CommonModule,
    FormacionRoutingModule,
    SharedModule,
  ]
})
export class FormacionModule { }
