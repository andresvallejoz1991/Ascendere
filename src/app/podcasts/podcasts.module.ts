import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PodcastRoutingModule } from './podcasts-routing.module';

@NgModule({
  declarations: [
    PodcastRoutingModule.pages,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PodcastRoutingModule,
  ]
})
export class PodcastsModule { }
