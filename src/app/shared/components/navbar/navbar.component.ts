import { Component } from '@angular/core';
import { SidebarService } from 'src/app/core/services/utils/navigation.service';

@Component({
  selector: 'ascendere-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  constructor(
    private readonly navbar: SidebarService,
  ) { }


  openNavbar() { this.navbar.openNavbar(); }

}
