// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'web-sg-ascendere',
    appId: '1:895314750765:web:f55b2474b512ffceceb7a4',
    databaseURL: 'https://web-sg-ascendere.firebaseio.com',
    storageBucket: 'web-sg-ascendere.appspot.com',
    locationId: 'us-east4',
    apiKey: 'AIzaSyDz-VPngPh-d0VjTkyRJwPH4eHOOy8xhSw',
    authDomain: 'web-sg-ascendere.firebaseapp.com',
    messagingSenderId: '895314750765',
    measurementId: 'G-KN235MTKF0',
  },
  youtubeApiKey: 'AIzaSyCOsbj6Klb5xM_vOXk4sxszAlRrs7IcD20',
  production: false,
  microsoftClientId: '06071308-bf52-4e43-8224-574feaef62d0',
  formacion: {
    rrhh: 'https://us-central1-web-sg-ascendere.cloudfunctions.net/getRRHH',
    inscribeEndpoint: 'https://us-central1-web-sg-ascendere.cloudfunctions.net/inscribeCourse'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
