import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EncuentrosService } from 'src/app/core/services/encuentros/encuentros.service';
import { SidebarService } from 'src/app/core/services/utils/navigation.service';

@Component({
  selector: 'ascendere-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  constructor(
    private readonly navbar: SidebarService,
    private readonly encuentrosService: EncuentrosService
  ) { }

  isOpen = false;
  navbarSub: Subscription | null = null;

  encuentrosTypes = this.encuentrosService.types;

  ngOnInit() {
    this.navbarSub = this.navbar.isOpen$.subscribe(v => this.isOpen = v);
  }

  ngOnDestroy(): void {
    this.navbarSub?.unsubscribe();
  }

  openNavbar() { this.navbar.openNavbar(); }
  closeNavbar() { this.navbar.closeNavbar(); }
}
