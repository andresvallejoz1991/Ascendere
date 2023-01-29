import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, where } from '@angular/fire/firestore';
import { collection, CollectionReference, doc, DocumentReference, limit, orderBy, query } from 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { catchError, map, mapTo, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { CursoDto } from './curso.dto';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  constructor(
    private readonly firestore: Firestore,
    private readonly http: HttpClient,
  ) { }

  private cursosCollection = collection(this.firestore, 'teacher-training') as CollectionReference<CursoDto>;

  getCursos$(): Observable<IRequest<Array<CursoDto>>> {
    const q = [
      orderBy(<keyof CursoDto>'date_postulation', 'desc'),
      orderBy(<keyof CursoDto>'date_start', 'desc'),
      limit(100),
    ];

    return collectionData(query(this.cursosCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  }

  getLatestCourse$(): Observable<IRequest<Array<CursoDto>>> {
    const q = [
      orderBy(<keyof CursoDto>'date_start', 'desc'),
      where(<keyof CursoDto>'date_start', '>=', new Date()),
    ];

    return collectionData(query(this.cursosCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  }

  getCurso$(id: string): Observable<IRequest<CursoDto>> {
    const encuentroDocument = doc(this.cursosCollection, id) as DocumentReference<CursoDto>;

    return docData(encuentroDocument, { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  }

  isUserRegisteredInCourse$(email: string | null, courseId: string): Observable<IRequest<boolean>> {
    if (email == null)
      return of(false).pipe(loadDataOperator());

    const inscriptionsCollection = collection(this.firestore, `/user-profile/${email}/trainer`) as CollectionReference;

    const queryParams = [
      where('course.id', '==', courseId),
      limit(1)
    ];

    return collectionData(query(inscriptionsCollection, ...queryParams)).pipe(
      map(snapshot => snapshot.length > 0),
      loadDataOperator(),
    );
  }

  rrhh$(email: string): Observable<boolean> {
    if (!email.includes('utpl.edu.ec')) {
      console.log("no es correo UTPL")
      return of(false)
    }
    this.http.get(environment.formacion.rrhh, { params: { email } }).subscribe(val => console.log(val));
    return this.http.get(environment.formacion.rrhh, { params: { email } }).pipe(
      mapTo(true),
      catchError(() => of(false))
    )
  }

  inscribeCourse$(email: string, courseId: string, itinerary: boolean): Observable<boolean> {
    return this.http.get(environment.formacion.inscribeEndpoint, { params: { itinerary, email, courseId } }).pipe(
      mapTo(true),
      catchError(() => of(false))
    )
  }
}

