import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarDividerComponent } from './sidebar-divider/sidebar-divider.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { SidebarComponent } from './sidebar.component';



@NgModule({
  declarations: [
    SidebarDividerComponent,
    SidebarHeaderComponent,
    SidebarItemComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
