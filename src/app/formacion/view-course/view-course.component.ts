import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { AuthModalService } from 'src/app/core/services/auth/auth-modal.service';
import { AuthenticationService } from 'src/app/core/services/auth/authentication.service';
import { CursoDto } from 'src/app/core/services/formacion/curso.dto';
import { CursosService } from 'src/app/core/services/formacion/cursos.service';
import { IRequest } from 'src/app/core/services/utils/request.interface';
import Swal from 'sweetalert2';

enum CanInscribeStatus {
  success,
  failedRRHH,
  notSignedIn
}

@Component({
  selector: 'ascendere-view-course',
  templateUrl: './view-course.component.html',
})
export class ViewCourseComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cursoService: CursosService,
    private readonly auth: AuthenticationService,
    private readonly authModal: AuthModalService,
    private readonly router: Router
  ) { }

  cursoId$: Observable<string> = this.route.params.pipe(
    map(q => q['id'] as string)
  );

  curso$: Observable<IRequest<CursoDto | null>> = this.cursoId$.pipe(
    switchMap(id => this.cursoService.getCurso$(id))
  );

  inscriptionsAvailable(date?: Date): boolean {
    const today = new Date();

    return date ? today.getTime() < date.getTime() : false;
  }

  isInscribed$ = combineLatest([this.auth.currentUser$, this.cursoId$]).pipe(
    switchMap(([user, cursoId]) => this.cursoService.isUserRegisteredInCourse$(user?.email!, cursoId)),
  )

  inscribeCourseSub: Subscription | null = null;

  gotoInscription() {
    if (!!this.inscribeCourseSub)
      return;

    const rrhhFn = (email: string) => this.cursoService.rrhh$(email).pipe(
      map(inscribed => inscribed ? CanInscribeStatus.success : CanInscribeStatus.failedRRHH),
    );

    this.inscribeCourseSub = this.auth.currentUser$.pipe(
      take(1),
      switchMap(user => !!user ? rrhhFn(user?.email!) : of(CanInscribeStatus.notSignedIn)),
    ).subscribe(status => {
      
      if (status === CanInscribeStatus.failedRRHH)
        Swal.fire({
          icon: 'error',
          title: 'No pudimos obtener tus datos de Recursos Humanos',
          position: 'top',
          timer: 1500,
          showConfirmButton: false
        });

      else if (status === CanInscribeStatus.notSignedIn)
        this.authModal.openModal();

      else if (status === CanInscribeStatus.success)
        this.router.navigate(['inscripcion'], { relativeTo: this.route })

      this.inscribeCourseSub?.unsubscribe();
      this.inscribeCourseSub = null;
    });

  }

}