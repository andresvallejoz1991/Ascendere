import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';
import { AscendereCircleIconComponent } from './ascendere-circle-icon/ascendere-circle-icon.component';
import { CloseCircleComponent } from './close-circle/close-circle.component';
import { DropdownOptionComponent } from './dropdown/dropdown-option.component';
import { DropdownSelectComponent } from './dropdown/dropdown-select.component';
import { FooterComponent } from './footer/footer.component';
import { GeniallyComponent } from './genially/genially.component';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { PaginationNavigationComponent } from './pagination-navigation/pagination-navigation.component';
import { PodcastCardComponent } from './podcasts-card/podcasts-card.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { WebinarCardComponent } from './webinar-card/webinar-card.component';
import { VisibilizacionCardComponent } from './visibilizacion-card/visibilizacion-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LoginModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    PodcastCardComponent,
    AscendereCircleIconComponent,
    PageTitleComponent,
    GeniallyComponent,
    LoadingComponent,
    ProjectCardComponent,
    SearchInputComponent,
    PaginationNavigationComponent,
    WebinarCardComponent,
    CloseCircleComponent,
    DropdownSelectComponent,
    DropdownOptionComponent,
    VisibilizacionCardComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    PodcastCardComponent,
    AscendereCircleIconComponent,
    PageTitleComponent,
    GeniallyComponent,
    LoadingComponent,
    ProjectCardComponent,
    SearchInputComponent,
    PaginationNavigationComponent,
    WebinarCardComponent,
    CloseCircleComponent,
    DropdownSelectComponent,
    DropdownOptionComponent,
    VisibilizacionCardComponent,
  ]
})
export class ComponentsModule { }
