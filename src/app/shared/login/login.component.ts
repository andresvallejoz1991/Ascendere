import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthModalService } from 'src/app/core/services/auth/auth-modal.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ascendere-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authModal: AuthModalService,
    private readonly authentication: AuthenticationService,
  ) { }

  isOpen = false;

  modalSub: Subscription | null = null;

  public currentUser$ = this.authentication.currentUser$;

  private _sub: Subscription | null = null;

  ngOnInit() {
    this.modalSub = this.authModal.isOpen$.subscribe(v => this.isOpen = v);
  }

  ngOnDestroy(): void {
    this.modalSub?.unsubscribe();
  }

  closeModal() { this.authModal.closeModal(); }

  loginGoogle() {
    if (!!this._sub) return;

    this._sub = this.authentication.loginGoogle$().subscribe((success) => {
      if (!success) this.modalError()
      this._sub?.unsubscribe();
      this._sub = null;
    });
  }

  loginMicrosoft() {
    if (!!this._sub) return;

    this._sub = this.authentication.loginMicrosoft$().subscribe((success) => {
      if (!success) this.modalError()
      this._sub?.unsubscribe();
      this._sub = null;
    });
  }

  loginUtpl() {
    if (!!this._sub) return;

    this._sub = this.authentication.loginUtpl$().subscribe((success) => {
      if (!success) this.modalError()
      this._sub?.unsubscribe();
      this._sub = null;
    });
  }

  logout() {
    if (!!this._sub) return;

    this._sub = this.authentication.logout$().subscribe((success) => {
      if (!success) this.modalError()
      this._sub?.unsubscribe();
      this._sub = null;
    });
  }
  modalError(){
    Swal.fire({
      icon: 'error',
      title: 'Ocurrió un error al guardar tu selección, vuelve a intentarlo',
      position: 'top',
      timer: 1500,
      showConfirmButton: false
    });
  }

}
