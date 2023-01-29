import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AscendereComponent } from './ascendere/ascendere.component';

const routes: Routes = [{
  path: 'ascendere',
  component: AscendereComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
  static pages = [AscendereComponent];
}
