import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, Observable, shareReplay } from 'rxjs';
import { IRequest } from '../core/services/utils/request.interface';
import { JornadaDto } from './jornada.dto';
import { JornadasService } from './jornadas.service';

@Component({
  selector: 'ascendere-jornadas',
  templateUrl: './jornadas.component.html',
})
export class JornadasComponent {

  constructor(
    private readonly jornadasService: JornadasService,
    private readonly route: ActivatedRoute,
  ) { }

  private jornadasSource$ = this.jornadasService.getAcademicSessions$().pipe(
    shareReplay(1),
  )

  private selectedJornada$: Observable<string | null> = this.route.queryParams.pipe(
    map(query => query['jornada'] ?? null),
    distinctUntilChanged(),
  );

  jornadasSelect$ = this.jornadasSource$.pipe(
    map(jornadas => [...(jornadas.data ?? [])]),
    map((data) => data?.map(j => j.title)),
    map(jornadas => jornadas.filter(i => !!i) as string[]),
  );

  jornada$: Observable<IRequest<JornadaDto>> = combineLatest([this.selectedJornada$, this.jornadasSource$]).pipe(
    map(([active, jornadas]) => {
      if (jornadas.loading)
        return <IRequest<JornadaDto>>{ data: null, error: null, loading: true };

      if (jornadas.error)
        return <IRequest<JornadaDto>>{ data: null, error: jornadas.error, loading: false };

      const first = jornadas.data?.find(_ => true) ?? null;
      const foundJornada = !!active ? jornadas.data?.find(j => j.title === active) ?? first : first;

      return <IRequest<JornadaDto>>{ data: foundJornada, error: null, loading: false };

    }),

  )

  goToTwitter() {
    window.open('https://twitter.com/hashtag/UTPLfuturo?src=hashtag_click', '_blank');
  }

}
