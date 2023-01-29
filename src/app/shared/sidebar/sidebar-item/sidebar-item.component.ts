import { Component, Input } from '@angular/core';

@Component({
  selector: 'a[ascendere-sidebar-item],button[ascendere-sidebar-item]',
  templateUrl: './sidebar-item.component.html',
})
export class SidebarItemComponent {

  @Input('active')
  set active(active: boolean) {
    this.isActive = active;
  }

  isActive: boolean = false;
}
