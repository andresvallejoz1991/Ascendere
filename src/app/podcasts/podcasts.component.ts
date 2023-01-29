import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { lastPodcastSeason, PodcastDto, podcastSeasonsIds, PodcastsService, seasonsIdsWithNames } from '../core/services/podcasts';
import { IRequest } from '../core/services/utils/request.interface';

@Component({
  selector: 'ascendere-podcasts',
  templateUrl: './podcasts.component.html',
})
export class PodcastsComponent implements OnInit {

  constructor(
    private readonly podcastsService: PodcastsService,
    private readonly router: ActivatedRoute,
  ) { }

  public activeSeasonId$ = this.router.queryParams.pipe(
    map(q => podcastSeasonsIds.includes(q['season'] ?? '') ? q['season'] : lastPodcastSeason)
  );

  public readonly availableSeasons$ = this.activeSeasonId$.pipe(
    map(seasonId => seasonsIdsWithNames.filter(season => season.key !== seasonId)),
  );

  public readonly activeSeason$ = this.activeSeasonId$.pipe(
    map(seasonId => seasonsIdsWithNames.find(season => season.key == seasonId)),
  );

  public podcasts$: Observable<IRequest<Array<PodcastDto>>> = this.activeSeasonId$.pipe(
    switchMap(season => this.podcastsService.getSeason$(season)),
  );

  public isDropdownOpen: boolean = false;

  ngOnInit(): void { }

  openDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  identify(index: number, item: PodcastDto) {
    return `${item.id}-${item.likesList?.length}-${item.dislikesList?.length}`;
  }

}
