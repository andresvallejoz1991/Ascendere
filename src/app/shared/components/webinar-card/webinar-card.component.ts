import { Component, Input } from '@angular/core';
import { YT } from 'src/app/core/youtube';

@Component({
  selector: 'ascendere-webinar-card',
  templateUrl: './webinar-card.component.html',
  styles: [
  ]
})
export class WebinarCardComponent {

  @Input('video')
  videoSource: YT.PlaylistItem | null = null;

  get video(): YT.PlaylistItem {
    if (this.videoSource === null)
      throw new Error("Missing property video");

    return this.videoSource
  }
}
