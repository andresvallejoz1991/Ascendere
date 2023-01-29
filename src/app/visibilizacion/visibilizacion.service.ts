import { Injectable } from '@angular/core';
import { map, Observable, startWith, tap } from 'rxjs';
import { loadDataOperator } from '../core/services/utils/load-data.operator';
import { IRequest } from '../core/services/utils/request.interface';
import { YoutubeService, YT } from '../core/youtube';

@Injectable({
  providedIn: 'root'
})
export class VisibilizacionService {

  constructor(
    private readonly youtube: YoutubeService,
  ) { }

  public getVisibilizacion$(playlistId: string): Observable<Array<YT.PlaylistItem>> {
    return this.youtube.fetchPlayListItems({
      playlistId: playlistId,
      part: 'snippet',
      maxResults: 100,
    }).pipe(
      map(res => res?.items ?? []),
      startWith([]),
      tap(console.log),
    );
  };

  public getLatestVisibilizacion$(): Observable<IRequest<Array<YT.PlaylistItem>>> {
    return this.youtube.fetchPlayListItems({
      playlistId: 'PLFPtt_hNbelsROZoxJ53H7dAHJoVGvk7R',
      part: 'snippet',
      maxResults: 1,
    }).pipe(
      map(res => res?.items ?? []),
      loadDataOperator(),
    );
  };
  public getLatestVisibilizacion2$(): Observable<IRequest<Array<YT.PlaylistItem>>> {
    return this.youtube.fetchPlayListItems({
      playlistId: 'PLFPtt_hNbelvRrJ5hhyo07WGlcUPGlvoN',
      part: 'snippet',
      maxResults: 1,
    }).pipe(
      map(res => res?.items ?? []),
      loadDataOperator(),
    );
  };


}
