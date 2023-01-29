import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { YT } from './youtube-models.dto';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(
    public readonly http: HttpClient
  ) { }

  fetchPlayListItems(parameters: YT.QueryPlaylist): Observable<YT.QueryPlaylistResponse | null> {

    let params = new HttpParams();

    params = params.set('key', environment.youtubeApiKey);
    params = params.set('part', parameters.part);
    params = params.set('playlistId', parameters.playlistId);

    if (!!parameters.maxResults)
      params = params.set('maxResults', `${parameters.maxResults}`);

    if (!!parameters.pageToken)
      params = params.set('pageToken', parameters.pageToken);

    return this.http.get<YT.QueryPlaylistResponse>('https://www.googleapis.com/youtube/v3/playlistItems', {
      params,
    }).pipe(
      catchError(err => {
        console.error(err);
        return of(null);
      }),
    );
  }

  getVideo$(videoId: string, parameters: YT.QueryVideo): Observable<YT.Video | null> {

    let params = new HttpParams();

    params = params.set('key', environment.youtubeApiKey);
    params = params.set('part', parameters.part);
    params = params.set('id', videoId);

    return this.http.get<YT.QueryVideoResponse>('https://www.googleapis.com/youtube/v3/videos', {
      params,
    }).pipe(
      map(res => res?.items?.[0] ?? null),
      catchError(err => {
        console.error(err);
        return of(null);
      }),
    );
  }

}
