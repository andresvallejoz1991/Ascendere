import { Component } from '@angular/core';
import { WebinarsService } from 'src/app/webinars/webinars.service';

@Component({
  selector: 'ascendere-ultimos-webinars',
  templateUrl: './ultimos-webinars.component.html',
  styles: [
  ]
})
export class UltimosWebinarsComponent {

  constructor(
    private readonly webinarsService: WebinarsService
  ) { }

  videos$ = this.webinarsService.getLatestWebinars$();

}
