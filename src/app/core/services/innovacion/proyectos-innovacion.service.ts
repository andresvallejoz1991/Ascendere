import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, doc, docData, Firestore, orderBy, query, where } from '@angular/fire/firestore';
import { limit } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { ProyectoDto } from './projecto.dto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosInnovacionService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  private proyectosCollection = collection(this.firestore, 'innovation-project') as CollectionReference<ProyectoDto>;

  getLatestProyectos$(): Observable<IRequest<Array<ProyectoDto>>> {
    const q = [
      where(<keyof ProyectoDto>"state", "==", "approved"),
      orderBy(<keyof ProyectoDto>'created', 'desc'),
      limit(3),
    ];

    return collectionData(query(this.proyectosCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator()
    );
  }


  getProyectos$(key: string | null): Observable<IRequest<Array<ProyectoDto>>> {

    const q = [
      ...(!!key ? [where(<keyof ProyectoDto>"type.id", "==", key)] : []),
      where(<keyof ProyectoDto>"state", "==", "approved"),
      orderBy(<keyof ProyectoDto>'created', 'desc'),
      limit(100),
    ];

    return collectionData(query(this.proyectosCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator()
    );
  }

  getProyecto$(id: string): Observable<IRequest<ProyectoDto>> {
    const docref = doc(this.proyectosCollection, id);
    return docData(docref, { idField: 'id' }).pipe(
      loadDataOperator()
    );
  }
}
