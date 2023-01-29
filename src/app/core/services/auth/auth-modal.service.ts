import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {

  constructor(readonly router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd)
        this.closeModal();
    });
  }

  private readonly isOpenSubject = new BehaviorSubject(false);

  public readonly isOpen$ = this.isOpenSubject.asObservable();

  closeModal() {
    this.isOpenSubject.next(false);
  }

  openModal() {
    this.isOpenSubject.next(true);
  }
}
