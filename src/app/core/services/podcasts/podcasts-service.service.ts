import { Injectable } from '@angular/core';
import { arrayRemove, arrayUnion, collection, collectionData, CollectionReference, doc, Firestore, orderBy, query, UpdateData, updateDoc, where } from '@angular/fire/firestore';
import { limit } from 'firebase/firestore';
import { catchError, from, mapTo, Observable, of } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { PodcastSeasons, SeasonId } from './podcast-seasons';
import { PodcastDto, PodcastUpdateLikes } from './podcasts.dto';

@Injectable({
  providedIn: 'root'
})
export class PodcastsService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  private readonly _podcastsCollection = collection(this.firestore, 'podcasts') as CollectionReference<PodcastDto>;

  public recentPodcasts$(): Observable<IRequest<Array<PodcastDto>>> {
    const q = [orderBy(<keyof PodcastDto>'created', 'desc'), limit(3)];

    return collectionData(query(this._podcastsCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  };

  public getSeason$(seasonId: SeasonId): Observable<IRequest<Array<PodcastDto>>> {
    const q = [orderBy(<keyof PodcastDto>'created', 'desc')];

    const season = PodcastSeasons[seasonId];

    if (season.startDate)
      q.push(where(<keyof PodcastDto>'created', '>=', season.startDate));

    if (season.endDate)
      q.push(where(<keyof PodcastDto>'created', '<=', season.endDate));

    return collectionData(query(this._podcastsCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  };

  public likePodcast$(uid: string, podcastId: string): Observable<boolean> {
    const updatePayload: PodcastUpdateLikes = { dislikesList: arrayRemove(uid), likesList: arrayUnion(uid) };
    return this.updatePodcast(podcastId, updatePayload);
  }

  public dislikePodcast$(uid: string, podcastId: string): Observable<boolean> {
    const updatePayload: PodcastUpdateLikes = { likesList: arrayRemove(uid), dislikesList: arrayUnion(uid) };
    return this.updatePodcast(podcastId, updatePayload);
  }

  private updatePodcast(podcastId: string, payload: UpdateData<PodcastDto>): Observable<boolean> {
    const docRef = doc(this._podcastsCollection, podcastId);
    return from(updateDoc(docRef, payload)).pipe(
      mapTo(true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
