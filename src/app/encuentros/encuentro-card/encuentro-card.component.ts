import { Component, Input } from '@angular/core';
import { EncuentroDto } from 'src/app/core/services/encuentros/encuentros.dto';

@Component({
  selector: 'ascendere-encuentro-card',
  templateUrl: './encuentro-card.component.html',
  styles: [
  ]
})
export class EncuentroCardComponent {

  @Input('encuentro')
  _encuentro: EncuentroDto | null = null;

  get encuentro(): EncuentroDto {
    if (this._encuentro === null)
      throw new Error("Missing input property encuentro");

    return this._encuentro;
  }

}
