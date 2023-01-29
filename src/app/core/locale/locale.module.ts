import { registerLocaleData } from '@angular/common';

// importar locales
import localeEc from '@angular/common/locales/es-EC';
import { LOCALE_ID, NgModule } from '@angular/core';


// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEc, 'es');

@NgModule({
  providers: [{ provide: LOCALE_ID, useValue: 'es-Ar' }],
})
export class LocaleModule { }
