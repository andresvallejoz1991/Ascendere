import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ascendere-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isNotHome: boolean = false;

  constructor(private router: Router) {
    // Detect current route
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        const parseUrl = val.url.split(/[\?\#]/)[0];
        this.isNotHome = !['/', '/podcasts-recientes', '/agenda', '/noticias'].includes(parseUrl);
      }
    });
  }

}