import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EncuentroTypeCardComponent } from './encuentro-type-card/encuentro-type-card.component';
import { EncuentrosRoutingModule } from './encuentros-routing.module';
import { EncuentroCardComponent } from './encuentro-card/encuentro-card.component';
import { ViewEncuentroComponent } from './view-encuentro/view-encuentro.component';



@NgModule({
  declarations: [
    EncuentrosRoutingModule.pages,
    EncuentroTypeCardComponent,
    EncuentroCardComponent,
    ViewEncuentroComponent,
  ],
  imports: [
    CommonModule,
    EncuentrosRoutingModule,
    SharedModule,
  ]
})
export class EncuentrosModule { }
