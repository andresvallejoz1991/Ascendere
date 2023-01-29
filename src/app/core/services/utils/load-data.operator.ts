import { catchError, map, Observable, of, OperatorFunction, startWith, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { IRequest } from "./request.interface";

export function loadDataOperator<T>(startData: T | null = null): OperatorFunction<T, IRequest<T>> {
    return (o: Observable<T>) => {

        return o.pipe(
            map<T, IRequest<T>>(data => ({ data, error: null, loading: false })),
            startWith<IRequest<T>>({ data: startData, error: null, loading: true }),
            catchError<IRequest<T>, Observable<IRequest<T>>>(error => of({ data: startData, error, loading: false })),
            tap(data => (!environment.production) && console.log(data)),
        );
    };
}