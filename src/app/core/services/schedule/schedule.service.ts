import { Injectable } from '@angular/core';
import { collection, collectionData, CollectionReference, Firestore, limit, orderBy, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { ScheduleDto } from './schedule.dto';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private readonly firestore: Firestore,
  ) { }

  private readonly _scheduleCollection = collection(this.firestore, 'schedule') as CollectionReference<ScheduleDto>;

  public getNextEvents$(): Observable<IRequest<Array<ScheduleDto>>> {
    const q = [
      // where('start', '>', new Date()),
      orderBy(<keyof ScheduleDto>'start', 'desc'),
      limit(3),
    ];

    return collectionData(query(this._scheduleCollection, ...q), { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  };

}
