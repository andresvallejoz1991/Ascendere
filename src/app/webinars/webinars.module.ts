import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WebinarsRoutingModule } from './webinars-routing.module';

@NgModule({
  declarations: [
    WebinarsRoutingModule.pages,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WebinarsRoutingModule
  ]
})
export class WebinarsModule { }
