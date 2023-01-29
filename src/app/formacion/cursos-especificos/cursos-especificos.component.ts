import { Component } from '@angular/core';
import { ArticleService } from 'src/app/core/services/articles/article.service';

@Component({
  selector: 'ascendere-cursos-especificos',
  templateUrl: './cursos-especificos.component.html',
  styles: [
  ]
})
export class CursosEspecificosComponent {

  constructor(
    private readonly articleServices: ArticleService,
  ) { }

  articulo$ = this.articleServices.getCursosEspecificosArticle$();

}
