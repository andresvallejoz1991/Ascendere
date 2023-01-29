import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, OAuthProvider, signInWithPopup, user } from "@angular/fire/auth";
import { catchError, from, mapTo, Observable, of, shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private readonly auth: Auth,
  ) { }

  currentUser$ = user(this.auth).pipe(
    shareReplay(1),
  );

  loginGoogle$(): Observable<boolean> {
    const provider = new GoogleAuthProvider();
    const signIn = signInWithPopup(this.auth, provider);
    return from(signIn).pipe(
      mapTo(true),
      catchError(err => {
        console.log({ err });
        return of(false);
      })
    );
  }

  loginMicrosoft$() {
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      clientId: environment.microsoftClientId,
    });
    provider.addScope("user.read");
    provider.addScope("openid");
    provider.addScope("profile");
    provider.addScope("mail.send");
    return from(signInWithPopup(this.auth, provider)).pipe(
      mapTo(true),
      catchError(err => {
        console.log({ err });
        return of(false);
      }),
    );
  }

  loginUtpl$() {
    const provider = new OAuthProvider("microsoft.com");
    provider.setCustomParameters({
      clientId: environment.microsoftClientId,
      tenant: "6eeb49aa-436d-43e6-becd-bbdf79e5077d",
    });
    provider.addScope("user.read");
    provider.addScope("openid");
    provider.addScope("profile");
    provider.addScope("mail.send");
    return from(signInWithPopup(this.auth, provider)).pipe(
      mapTo(true),
      catchError(err => {
        console.log({ err });
        return of(false);
      }),
    );
  }


  logout$() {
    const signOut = this.auth.signOut();
    return from(signOut).pipe(
      mapTo(true),
      catchError(err => {
        console.log({ err });
        return of(false);
      })
    );
  }
}
