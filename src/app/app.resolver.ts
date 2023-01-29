import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppResolver implements Resolve<boolean> {
  constructor(private router:Router){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    var pathvalido:string = '';
    var pathCompleto = '';
    route.url.forEach(function (value) {
      pathCompleto +=  '/';
      pathCompleto +=  value;
    });
    console.log(pathCompleto);

    if (pathCompleto == '/innovation'){
      pathvalido = 'innovacion-docente';
    }else if(pathCompleto == '/about/ascendere'){
      pathvalido = 'acerca-de/ascendere';
    }else if(pathCompleto == '/about/liid-utpl'){
      //pathvalido = "liid/laboratorio"; 
      window.location.href="https://liidutpl.ec/";
    }
    else if(pathCompleto == '/about/tools'){
      pathvalido = 'liid/recursos';
    }else if(pathCompleto == '/observatory/teaching-assistants'){
      pathvalido = 'innovacion-docente/ayudantes-de-catedra';
    }else if(pathCompleto == '/training'){
      pathvalido = 'formacion';
    }// training/ascendere-camp no esta contemplado en el aplicativo de ahora
    else if(pathCompleto == '/observatory/podcast'){
      pathvalido = 'podcasts';
    }else if(pathCompleto == '/observatory/webinars'){
      pathvalido = 'webinars';
    }else if(pathCompleto.startsWith('/meet')){
      pathvalido = pathCompleto.replace('/meet', 'encuentros');
    }else if(pathCompleto.startsWith('/observatory/news')){
      pathvalido = pathCompleto.replace('/observatory/news/news-detail', 'noticias');
    }else if(pathCompleto == '/observatory/academic-sessions'){
      pathvalido = 'jornadas';
    }else if(pathCompleto == 'innovation'){
      pathvalido = 'innovacion-docente';
    }
    
    if (pathvalido != ''){
      this.router.navigate([pathvalido]);
    }
    
    return of(false);
  }
}
