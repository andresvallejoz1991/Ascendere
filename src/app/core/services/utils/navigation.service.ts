import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(readonly router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd)
        this.closeNavbar();
    });
  }

  private readonly isOpenSubject = new BehaviorSubject(false);

  public readonly isOpen$ = this.isOpenSubject.asObservable();

  closeNavbar() {
    this.isOpenSubject.next(false);
  }

  openNavbar() {
    this.isOpenSubject.next(true);
  }

}
