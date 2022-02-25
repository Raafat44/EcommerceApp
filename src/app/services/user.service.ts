import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId:string;
  constructor(private fs:AngularFirestore,private aut:AngularFireAuth){ }
  addnewUser(id,name)
  {    
    return this.fs.collection('users').doc(id).set({
      name      
    })
  }
  
}
