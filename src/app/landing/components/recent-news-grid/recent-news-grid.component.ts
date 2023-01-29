import { Component } from '@angular/core';
import { NewsServiceService } from 'src/app/core/services/news';

@Component({
  selector: 'ascendere-recent-news-grid',
  templateUrl: './recent-news-grid.component.html',
  styleUrls: ['./recent-news-grid.component.scss'
  ]
})
export class RecentNewsGridComponent {

  constructor(
    private readonly newsService: NewsServiceService,
  ) { }

  news$ = this.newsService.getLatestNews$();
}
