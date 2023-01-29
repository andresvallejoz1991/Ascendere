import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, of, Subscription, switchMap, take, zip } from 'rxjs';
import { AuthModalService } from 'src/app/core/services/auth/auth-modal.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { CursoDto } from 'src/app/core/services/formacion/curso.dto';
import { CursosService } from 'src/app/core/services/formacion/cursos.service';
import { IRequest } from 'src/app/core/services/utils/request.interface';
import Swal from 'sweetalert2';


enum InscribeStatus {
  success,
  notSignedIn,
  failed
}

@Component({
  selector: 'ascendere-inscription-form',
  templateUrl: './inscription-form.component.html',
})
export class InscriptionFormComponent {

  constructor(
    private readonly router: ActivatedRoute,
    private readonly cursoService: CursosService,
    private readonly auth: AuthenticationService,
    private readonly authModal: AuthModalService,
  ) { }

  currentUser$ = this.auth.currentUser$;

  cursoId$: Observable<string> = this.router.params.pipe(
    map(q => q['id'] as string)
  );

  isInscribed$ = combineLatest([this.auth.currentUser$, this.cursoId$]).pipe(
    switchMap(([user, cursoId]) => this.cursoService.isUserRegisteredInCourse$(user?.email!, cursoId)),
  )

  curso$: Observable<IRequest<CursoDto | null>> = this.cursoId$.pipe(
    switchMap(id => this.cursoService.getCurso$(id))
  );

  inscribeCourseSub: Subscription | null = null;

  inscribeCourse(itinerary: boolean) {
    if (!!this.inscribeCourseSub)
      return;

    const inscribeFn = (email: string, courseId: string, itinerary: boolean) => this.cursoService.inscribeCourse$(email, courseId, itinerary).pipe(
      map(inscribed => inscribed ? InscribeStatus.success : InscribeStatus.failed),
    );

    this.inscribeCourseSub = zip([this.currentUser$.pipe(take(1)), this.cursoId$.pipe(take(1))]).pipe(
      switchMap(([user, cursoId]) => !!user ? inscribeFn(user.email!, cursoId, itinerary) : of(InscribeStatus.notSignedIn)),
    ).subscribe(status => {
      console.log(status)
      if (status === InscribeStatus.failed) {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error al guardar la inscripción',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });
      }
      else if (status === InscribeStatus.notSignedIn) {
        this.authModal.openModal();
      }
      else if (status === InscribeStatus.success) {
        Swal.fire({
          icon: 'success',
          title: 'Tu inscripción se guardo correctamente',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });
      }

      this.inscribeCourseSub?.unsubscribe();
      this.inscribeCourseSub = null;
    });
  }
}
