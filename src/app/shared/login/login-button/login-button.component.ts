import { Component, OnInit } from '@angular/core';
import { AuthModalService } from 'src/app/core/services/auth/auth-modal.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';

@Component({
  selector: 'ascendere-login-button',
  templateUrl: './login-button.component.html',
  styles: [
  ]
})
export class LoginButtonComponent implements OnInit {

  constructor(
    private readonly authModal: AuthModalService,
    private readonly authentication: AuthenticationService,
  ) { }

  public currentUser$ = this.authentication.currentUser$;

  ngOnInit(): void { }

  openModal() { this.authModal.openModal(); }

}
