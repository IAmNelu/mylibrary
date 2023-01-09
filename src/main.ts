import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import routes from './app/routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDJmoC0Ie2ocRn3eMjdJrj2KQ5j8huhZeI",
  authDomain: "mylibrary-valentin.firebaseapp.com",
  databaseURL: "https://mylibrary-valentin-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mylibrary-valentin",
  storageBucket: "mylibrary-valentin.appspot.com",
  messagingSenderId: "218557345267",
  appId: "1:218557345267:web:af71d95c359b0e5e947686",
  measurementId: "G-8GV571YTZK"
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes,
        // { enableTracing: true }
      ),
    ),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(firebaseConfig))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
})
  .catch(err => console.error(err)); 