import { Injectable } from '@angular/core';
import { map, Observable, startWith, tap } from 'rxjs';
import { loadDataOperator } from '../core/services/utils/load-data.operator';
import { IRequest } from '../core/services/utils/request.interface';
import { YoutubeService, YT } from '../core/youtube';

@Injectable({
  providedIn: 'root'
})
export class WebinarsService {

  constructor(
    private readonly youtube: YoutubeService,
  ) { }

  public getWebinars$(playlistId: string): Observable<Array<YT.PlaylistItem>> {
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

  public getLatestWebinars$(): Observable<IRequest<Array<YT.PlaylistItem>>> {
    return this.youtube.fetchPlayListItems({
      playlistId: 'PLFPtt_hNbeltLbUUvyo3OJYg_WWBeSA3z',
      part: 'snippet',
      maxResults: 2,
    }).pipe(
      map(res => res?.items ?? []),
      loadDataOperator(),
    );
  };

}

