import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AscendereCardComponent } from './ascendere-card/ascendere-card.component';



@NgModule({
  declarations: [
    AboutRoutingModule.pages,
    AscendereCardComponent,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
  ]
})
export class AboutModule { }
