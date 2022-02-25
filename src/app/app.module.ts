import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFireStorageModule} from '@angular/fire/storage'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { GoodsComponent } from './Components/goods/goods.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { NotAllowedComponent } from './Components/not-allowed/not-allowed.component';
import { LoadingComponent } from './Components/loading/loading.component';
const firebaseConfig = {
  apiKey: "AIzaSyDb1f6lXiHZU4B5NzcAmxfaNpwKJ6o4w68",
  authDomain: "market-38959.firebaseapp.com",
  projectId: "market-38959",
  storageBucket: "market-38959.appspot.com",
  messagingSenderId: "968347241323",
  appId: "1:968347241323:web:898a040525aef98c9c1a2e",
  measurementId: "G-P4TZRHL1TP"
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    GoodsComponent,
    LoginComponent,
    SignUpComponent,
    NotFoundComponent,
    NotAllowedComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
