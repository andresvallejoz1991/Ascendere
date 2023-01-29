import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, switchMap } from 'rxjs';
import { visibilizacionSeasonsIds, seasonsIdsWithNames, lastVisibilizacionSeasonId } from '../core/services/visibilizacion/visibilizacion-seasons.data';
import { VisibilizacionService } from './visibilizacion.service';

@Component({
  selector: 'ascendere-visibilizacion',
  templateUrl: './visibilizacion.component.html',
  styles: [
  ]
})
export class VisibilizacionComponent {

  constructor(
    private readonly visibilizacionService: VisibilizacionService,
    private readonly router: ActivatedRoute,
  ) { }

  isDropdownOpen = false;

  public activeSeasonId$ = this.router.queryParams.pipe(
    tap(console.log),
    map(q => visibilizacionSeasonsIds.includes(q['visibilizacionSeason'] ?? '') ? q['visibilizacionSeason'] : lastVisibilizacionSeasonId),
    tap(console.log),
  );

  public readonly availableSeasons$ = this.activeSeasonId$.pipe(
    map(seasonId => seasonsIdsWithNames.filter(season => season.id !== seasonId)),
  );

  public readonly activeSeason$ = this.activeSeasonId$.pipe(
    map(seasonId => seasonsIdsWithNames.find(season => season.id == seasonId)),
  );

  videos$ = this.activeSeason$.pipe(
    switchMap(season => this.visibilizacionService.getVisibilizacion$(season!.playlistId))
  );

  openDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  isDropdownOpen2 = false;

  videos2$ = this.visibilizacionService.getVisibilizacion$('PLFPtt_hNbelvRrJ5hhyo07WGlcUPGlvoN');

  openDropdown2(): void {
    this.isDropdownOpen2 = !this.isDropdownOpen;
  }


}
