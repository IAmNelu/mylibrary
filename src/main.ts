import { enableProdMode, importProvidersFrom } from '@angular/core';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { RouterModule } from '@angular/router';
import routes from './app/routes';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AuthService } from './app/services/auth.service';
import { AngularFireAuth, AngularFireAuthModule, SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';

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
      RouterModule.forRoot(routes,),
    ),
    // importProvidersFrom(
    //   provideFirebaseApp(() => initializeApp(firebaseConfig)),

    // ),
    importProvidersFrom(AngularFireModule.initializeApp(firebaseConfig)),
    importProvidersFrom(
      provideFirestore(() => getFirestore())
    ),
    importProvidersFrom(AngularFireAuthModule),
    importProvidersFrom(AngularFirestoreModule),
    importProvidersFrom(AngularFireStorageModule),
    importProvidersFrom(AngularFireDatabaseModule),
  ]
})
  .catch(err => console.error(err)); 