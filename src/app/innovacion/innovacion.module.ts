import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectTypeCardComponent } from './components/project-type-card/project-type-card.component';
import { InnovacionRoutingModule } from './innovacion-routing.module';

@NgModule({
  declarations: [
    InnovacionRoutingModule.pages,
    ProjectTypeCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    InnovacionRoutingModule
  ]
})
export class InnovacionModule { }
