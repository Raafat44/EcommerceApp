import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user;
  userID;
  isAdmin:boolean;  
  isUser:boolean;
  constructor(private afauth:AngularFireAuth,private router:Router,private fs:AngularFirestore) { 
    this.user = afauth.user;     
    this.fs.collection("adminVar").doc('SEVYxSt2r8dQyab2kQ8T').snapshotChanges().subscribe(a => this.isAdmin = a.payload.data()['status'])
    this.afauth.user.subscribe(u =>
        {if(u)
        {
          this.isUser = true;
        }else
        {
          this.isUser = false;
        }}
      )
  }
  signUp(email,password)
  {
   return this.afauth.createUserWithEmailAndPassword(email,password);
  }
  login(email,password)
  {
    return this.afauth.signInWithEmailAndPassword(email,password);
  }
  logout()
  {
    return this.afauth.signOut();
  }
  valid()
  {
    this.fs.collection("adminVar").doc('SEVYxSt2r8dQyab2kQ8T').snapshotChanges().subscribe(a => this.isAdmin = a.payload.data()['status'])
   return  new Promise(resolve =>{
      this.afauth.user.subscribe(user =>{
        if(user && this.isAdmin == false)
        {
          resolve(true);
        } 
        else
        {         
          this.router.navigate([''])
          resolve(false);
        }
      })
    })
  }  
}
