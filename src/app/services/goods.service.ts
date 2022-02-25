import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(private firestore : AngularFirestore,private storage:AngularFireStorage,private router:Router) {  }

  getAllGoods()
  {
     return this.firestore.collection('goods').snapshotChanges();
  }
 addnewgood(name,price,image:File)
 {
   let ref = this.storage.ref( image.name );
   ref.put(image).then(()=>{
     ref.getDownloadURL().subscribe(photoURL =>{
       this.firestore.collection('goods').add({
         name,
         price,
         photoUrl:photoURL,
         amount:1
       })
     })
   })
 }
 modify()
 {
   
 }
}
