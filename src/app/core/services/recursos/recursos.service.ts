import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore, orderBy } from '@angular/fire/firestore';
import { query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { RecursoDto } from './recurso.dto';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  private licencesCollection = collection(this.firestore, 'licences') as CollectionReference<RecursoDto>;


  getRecursos$(): Observable<IRequest<Array<RecursoDto>>> {
    const q = [
      where(<keyof RecursoDto>'licence', '==', true),
      orderBy(<keyof RecursoDto>'name', 'asc'),
    ];

    return collectionData(query(this.licencesCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );

  }
}
