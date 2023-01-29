import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { lastWebinarSeasonId, seasonsIdsWithNames, webinarsSeasonsIds } from '../core/services/webinars/webinars-seasons.data';
import { WebinarsService } from './webinars.service';

@Component({
  selector: 'ascendere-webinars',
  templateUrl: './webinars.component.html',
  styles: [
  ]
})
export class WebinarsComponent {

  constructor(
    private readonly webinarsService: WebinarsService,
    private readonly router: ActivatedRoute,
  ) { }

  isDropdownOpen = false;
  seasonName = '';

  public activeSeasonId$ = this.router.queryParams.pipe(
    tap(console.log),
    map(q => webinarsSeasonsIds.includes(q['webinarSeason'] ?? '') ? q['webinarSeason'] : lastWebinarSeasonId),
    tap(x => this.seasonName= x),
  );

  public readonly availableSeasons$ = this.activeSeasonId$.pipe(
    map(seasonId => seasonsIdsWithNames.filter(season => season.id !== seasonId)),
  );

  public readonly activeSeason$ = this.activeSeasonId$.pipe(
    map(seasonId => seasonsIdsWithNames.find(season => season.id == seasonId)),
  );

  videos$ = this.activeSeason$.pipe(
    switchMap(season => this.webinarsService.getWebinars$(season!.playlistId))
  );

  openDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
