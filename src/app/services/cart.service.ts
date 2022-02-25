import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Goods } from '../interfaces/goods';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  userID;
  constructor( private fs:AngularFirestore,private afauth : AngularFireAuth,private auth:AuthService ) { }
  addtoCart(data:object)
  {
    this.afauth.currentUser.then(id => 
      {
        this.fs.collection("users").doc(id.uid).collection("cart").add(data);
      })
  }
  carts = [];
   getusercart()
  {  
   
    return this.fs.collection("users").doc(this.auth.userID).collection("cart").snapshotChanges();        
  }
}
