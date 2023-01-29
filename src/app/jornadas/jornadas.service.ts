import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, CollectionReference, orderBy, query } from 'firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { loadDataOperator } from '../core/services/utils/load-data.operator';
import { JornadaDto } from './jornada.dto';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  private jornadaCollection = collection(this.firestore, 'academic-sessions') as CollectionReference<JornadaDto>;

  getAcademicSessions$() {
    const q = [
      orderBy(<keyof JornadaDto>'date', 'desc'),
    ];

    return collectionData(query(this.jornadaCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  }
}
