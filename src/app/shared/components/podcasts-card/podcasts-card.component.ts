import { Component, Input } from '@angular/core';
import { map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { AuthModalService } from 'src/app/core/services/auth/auth-modal.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { PodcastsService } from 'src/app/core/services/podcasts';
import { PodcastDto } from 'src/app/core/services/podcasts/podcasts.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'ascendere-podcast-card',
  templateUrl: './podcast-card.component.html',
})
export class PodcastCardComponent {

  constructor(
    private readonly podcastsService: PodcastsService,
    private readonly auth: AuthenticationService,
    private readonly authModal: AuthModalService,
  ) { }

  @Input('podcast')
  set _pcValue(pcst: PodcastDto | null) {
    if (pcst?.thumbnail === this.cache1?.thumbnail)
      return;
    this.cache1 = pcst;
  }

  cache1: PodcastDto | null = null;

  get podcast(): PodcastDto {
    if (!this.cache1) throw new Error('Missing input PODCAST');
    return this.cache1;
  }

  isContentExpanded: boolean = false;

  private likeSub: Subscription | null = null;

  hasLiked$: Observable<boolean> = this.auth.currentUser$.pipe(
    map(user => !!user ? this.podcast.likesList?.includes(user.uid) ?? false : false)
  );

  hasDisliked$: Observable<boolean> = this.auth.currentUser$.pipe(
    map(user => !!user ? this.podcast.dislikesList?.includes(user.uid) ?? false : false)
  );

  toggleExpand(): void {
    this.isContentExpanded = !this.isContentExpanded;
  }

  like() {
    if (!!this.likeSub) return;

    this.likeSub = this.auth.currentUser$.pipe(
      take(1),
      map(user => user?.uid ?? null),
      switchMap(uid => {
        if (uid)
          return this.podcastsService.likePodcast$(uid, this.podcast.id);

        Swal.fire({
          icon: 'warning',
          title: 'Debes iniciar sesión para guardar tu selección',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        }).then(result =>{
          this.authModal.openModal()
        });
        return of(true);
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
      this.likeSub?.unsubscribe();
      this.likeSub = null;
    })
  }

  dislike() {
    if (!!this.likeSub) return;

    this.likeSub = this.auth.currentUser$.pipe(
      take(1),
      map(user => user?.uid ?? null),
      switchMap(uid => {
        if (uid)
          return this.podcastsService.dislikePodcast$(uid, this.podcast.id);

        Swal.fire({
          icon: 'warning',
          title: 'Debes iniciar sesión para guardar tu selección',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        }).then(result =>{
          this.authModal.openModal()
        });
        return of(true);
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
      this.likeSub?.unsubscribe();
      this.likeSub = null;
    })
  }

}
