import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JornadasRoutingModule } from './jornadas-routing.module';
import { JornadasService } from './jornadas.service';


@NgModule({
  declarations: [
    JornadasRoutingModule.pages,
  ],
  imports: [
    CommonModule,
    SharedModule,
    JornadasRoutingModule
  ],
  providers: [
    JornadasService,
  ]
})
export class JornadasModule { }
