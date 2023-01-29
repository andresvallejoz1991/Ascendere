import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, docData, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { collectionGroup, doc, DocumentReference, limit } from 'firebase/firestore';
import { Observable, of, startWith, switchMap } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { EncuentrosTypes } from './encuentros-types';
import { EncuentroDto } from './encuentros.dto';

@Injectable({
  providedIn: 'root'
})
export class EncuentrosService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  public readonly types = EncuentrosTypes;


  getLatestEncuentros$(): Observable<IRequest<Array<EncuentroDto>>> {
    const encuentrosCollection = collectionGroup(this.firestore, 'event') as CollectionReference<EncuentroDto>;

    const q = [
      orderBy(<keyof EncuentroDto>'date', 'asc'),
      where(<keyof EncuentroDto>'date', '>', new Date()),
      limit(3),
    ];

    const all = [
      orderBy(<keyof EncuentroDto>'date', 'desc'),
      limit(3),
    ];

    return collectionData(query(encuentrosCollection, ...q), { idField: 'id' }).pipe(
      switchMap(encuentros => encuentros.length > 0 ? of(encuentros) : collectionData(query(encuentrosCollection, ...all), { idField: 'id' })),
      loadDataOperator()
    );
  }

  getEncuentrosOfType$(key: string): Observable<IRequest<Array<EncuentroDto>>> {
    const encuentrosCollection = collection(this.firestore, 'events', key, 'event') as CollectionReference<EncuentroDto>;

    const q = [
      orderBy(<keyof EncuentroDto>'date', 'desc'),
    ];

    return collectionData(query(encuentrosCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator()
    );
  }

  getEncuentro$(key: string, id: string): Observable<EncuentroDto | null> {
    const encuentroDocument = doc(this.firestore, 'events', key, 'event', id) as DocumentReference<EncuentroDto>;

    return docData(encuentroDocument, { idField: 'id' }).pipe(
      startWith(null),
    );
  }
}
