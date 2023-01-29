import { Component } from '@angular/core';

@Component({
  selector: 'ascendere-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {

  constructor() {
    this.blueBackground = Math.random() < 0.5;
  }

  blueBackground: boolean;
}
