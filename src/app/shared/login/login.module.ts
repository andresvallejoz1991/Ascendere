import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LoginComponent } from './login.component';
import { LoginWithButtonComponent } from './login-with-button/login-with-button.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginButtonComponent,
    LoginWithButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginComponent,
    LoginButtonComponent,
  ]
})
export class LoginModule { }
