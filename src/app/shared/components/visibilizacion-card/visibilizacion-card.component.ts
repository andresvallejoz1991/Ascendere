import { Component, Input } from '@angular/core';
import { YT } from 'src/app/core/youtube';

@Component({
  selector: 'ascendere-visibilizacion-card',
  templateUrl: './visibilizacion-card.component.html',
  styles: [
  ]
})
export class VisibilizacionCardComponent {

  @Input('video')
  videoSource: YT.PlaylistItem | null = null;

  get video(): YT.PlaylistItem {
    if (this.videoSource === null)
      throw new Error("Missing property video");

    return this.videoSource
  }

}
