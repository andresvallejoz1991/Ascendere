import { Injectable } from '@angular/core';
import { arrayRemove, arrayUnion, collection, collectionData, CollectionReference, doc, DocumentReference, Firestore, limit, orderBy, query, UpdateData, updateDoc } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { catchError, from, mapTo, Observable, of } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { NewsDto, NewsUpdateLikes } from './news.dto';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  private readonly _newsCollection = collection(this.firestore, 'news') as CollectionReference<NewsDto>;

  public getLatestNews$(): Observable<IRequest<Array<NewsDto | null>>> {
    const q = [orderBy('created', 'desc'), limit(4)];

    return collectionData(query(this._newsCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator<Array<NewsDto | null>>([null, null, null, null]),
    );
  };

  public getNews$(): Observable<IRequest<Array<NewsDto | null>>> {
    const q = [orderBy('created', 'desc'), limit(100)];

    return collectionData(query(this._newsCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  };

  public getNewsWithId$(id: string): Observable<IRequest<NewsDto>> {
    const docRf = doc(this._newsCollection, id) as DocumentReference<NewsDto>;
    return docData(docRf, { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  };

  public likeNews$(uid: string, podcastId: string): Observable<boolean> {
    const updatePayload: NewsUpdateLikes = { dislikesList: arrayRemove(uid), likesList: arrayUnion(uid) };
    return this.updatePodcast(podcastId, updatePayload);
  }

  public dislikeNews$(uid: string, podcastId: string): Observable<boolean> {
    const updatePayload: NewsUpdateLikes = { likesList: arrayRemove(uid), dislikesList: arrayUnion(uid) };
    return this.updatePodcast(podcastId, updatePayload);
  }

  private updatePodcast(newsId: string, payload: UpdateData<NewsDto>): Observable<boolean> {
    const docRf = doc(this._newsCollection, newsId) as DocumentReference<UpdateData<NewsDto>>;
    return from(updateDoc(docRf, payload)).pipe(
      mapTo(true),
      catchError(err => {
        console.error(err);
        return of(false);
      })
    );
  }
}
