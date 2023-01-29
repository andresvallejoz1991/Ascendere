import { Injectable } from '@angular/core';
import { collection, CollectionReference, doc, DocumentReference, Firestore } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { loadDataOperator } from '../utils/load-data.operator';
import { IRequest } from '../utils/request.interface';
import { ArticleDto } from './article.dto';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private readonly firestore: Firestore,
  ) { }

  private articulosCollection = collection(this.firestore, 'articles') as CollectionReference<ArticleDto>;


  getCursosEspecificosArticle$(): Observable<IRequest<ArticleDto>> {
    const encuentroDocument = doc(this.articulosCollection, 'd9OZvO4apjiJbCw3CGtp') as DocumentReference<ArticleDto>;

    return docData(encuentroDocument, { idField: 'id' }).pipe(
      loadDataOperator(),
    );
  }


}
