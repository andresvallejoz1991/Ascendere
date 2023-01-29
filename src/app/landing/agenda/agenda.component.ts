import { Component } from '@angular/core';
import { ScheduleService } from 'src/app/core/services/schedule/schedule.service';

@Component({
  selector: 'ascendere-agenda',
  templateUrl: './agenda.component.html',
  styles: [
  ]
})
export class AgendaComponent {

  constructor(
    private scheduleService: ScheduleService
  ) { }

  schedule$ = this.scheduleService.getNextEvents$();
}
