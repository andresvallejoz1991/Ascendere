import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, of, shareReplay, Subscription, switchMap, take, timeout } from 'rxjs';
import { AuthModalService } from 'src/app/core/services/auth/auth-modal.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { NewsServiceService } from 'src/app/core/services/news';
import {DomSanitizer} from '@angular/platform-browser';
import Swal from 'sweetalert2';
@Component({
  selector: 'ascendere-view-noticia',
  templateUrl: './view-noticia.component.html',
  styles: [
  ]
})
export class ViewNoticiaComponent {

  constructor(
    private newService: NewsServiceService,
    private route: ActivatedRoute,
    private readonly auth: AuthenticationService,
    private readonly authModal: AuthModalService,
    public sanitizer: DomSanitizer
  ) { }

  public news$ = this.route.params.pipe(
    switchMap(params => this.newService.getNewsWithId$(params['id'])),
    shareReplay(1),
  );

  hasLiked$: Observable<boolean> = combineLatest([this.auth.currentUser$, this.news$]).pipe(
    map(([user, news]) => news.data && user ? news.data.likesList?.includes(user.uid) ?? false : false)
  );

  hasDisliked$: Observable<boolean> = combineLatest([this.auth.currentUser$, this.news$]).pipe(
    map(([user, news]) => news.data && user ? news.data.dislikesList?.includes(user.uid) ?? false : false)
  );

  private likeSub: Subscription | null = null;

  like() {
    if (!!this.likeSub) return;

    this.likeSub = combineLatest([this.auth.currentUser$, this.news$]).pipe(
      take(1),
      switchMap(([user, news]) => {
        if (!news.data) {
          return of(false);
        }

        if (!user) {
          Swal.fire({
            icon: 'warning',
            title: 'Debes iniciar sesión para guardar tu selección',
            position: 'top',
            timer: 1500,
            showConfirmButton: false
          }).then(result =>{
            this.authModal.openModal()
          });
          return of(true)
        }

        return this.newService.likeNews$(user.uid, news.data.id);
      }),
    ).subscribe(success => {
      if (!success) {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al guardar tu selección, vuelve a intentarlo',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });
      }
      setTimeout(() => {
        this.likeSub?.unsubscribe();
        this.likeSub = null;
      }, 1000);
    })
  }

  dislike() {
    if (!!this.likeSub) return;

    this.likeSub = combineLatest([this.auth.currentUser$, this.news$]).pipe(
      take(1),
      switchMap(([user, news]) => {
        if (!news.data) {
          return of(false);
        }

        if (!user) {
          Swal.fire({
            icon: 'warning',
            title: 'Debes iniciar sesión para guardar tu selección',
            position: 'top',
            timer: 1500,
            showConfirmButton: false
          }).then(result =>{
            this.authModal.openModal();
          });
          
          return of(true)
        }

        return this.newService.dislikeNews$(user.uid, news.data.id);
      }),
    ).subscribe(success => {
      if (!success){
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al guardar tu selección, vuelve a intentarlo',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });
      } 
      setTimeout(() => {
        this.likeSub?.unsubscribe();
        this.likeSub = null;
      }, 1000);
    })
  }

}
