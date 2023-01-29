import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastDto, PodcastsService } from 'src/app/core/services/podcasts';
import { IRequest } from 'src/app/core/services/utils/request.interface';

@Component({
  selector: 'ascendere-recent-podcasts',
  templateUrl: './recent-podcasts.component.html',
  styles: [
  ]
})
export class RecentPodcastsComponent {

  constructor(
    private readonly podcastsService: PodcastsService,
  ) { }

  public podcasts$: Observable<IRequest<Array<PodcastDto>>> = this.podcastsService.recentPodcasts$();

  identify(index: number, item: PodcastDto) {
    return `${item.id}-${item.likesList?.length}-${item.dislikesList?.length}`;
  }

}
