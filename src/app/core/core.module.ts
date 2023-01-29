import { NgModule } from '@angular/core';
import { FirebaseModule } from './firebase/firebase.module';
import { LocaleModule } from './locale/locale.module';
import { YoutubeModule } from './youtube/youtube.module';

@NgModule({
  imports: [
    FirebaseModule,
    YoutubeModule,
    LocaleModule,
  ],
  exports: [
    FirebaseModule,
    YoutubeModule,
    LocaleModule,
  ]
})
export class CoreModule { }
