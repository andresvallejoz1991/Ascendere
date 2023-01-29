import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { EncuentroDto } from 'src/app/core/services/encuentros/encuentros.dto';
import { EncuentrosService } from 'src/app/core/services/encuentros/encuentros.service';

@Component({
  selector: 'ascendere-view-encuentro',
  templateUrl: './view-encuentro.component.html',
  styles: [
  ]
})
export class ViewEncuentroComponent {

  constructor(
    private readonly encuentrosService: EncuentrosService,
    private readonly router: ActivatedRoute,
  ) { }

  encuentro$: Observable<EncuentroDto | null> = this.router.params.pipe(
    switchMap(q => this.encuentrosService.getEncuentro$(q['key'], q['id']))
  );

}
