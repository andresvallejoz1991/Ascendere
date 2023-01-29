import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LiidRoutingModule } from './liid-routing.module';

@NgModule({
  declarations: [
    LiidRoutingModule.pages,
  ],
  imports: [
    CommonModule,
    LiidRoutingModule,
    SharedModule,
  ]
})
export class LiidModule { }
