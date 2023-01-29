import { Component } from '@angular/core';

@Component({
  selector: 'ascendere-innovacion',
  templateUrl: './innovacion.component.html',
  styles: [
  ]
})
export class InnovacionComponent {

  isBuenasPracticasOpen = false;

  toggleBuenasPracticas() {
    this.isBuenasPracticasOpen = !this.isBuenasPracticasOpen;
  }
}
