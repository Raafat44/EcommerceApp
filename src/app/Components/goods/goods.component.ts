import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {
  @ViewChild('image') image:ElementRef;
  constructor(private goodsSerivce:GoodsService,private firestore:AngularFirestore,private router:Router,private storage:AngularFireStorage) { }

  goods = [];
  ngOnInit(): void {
    this.firestore.collection("goods").snapshotChanges().subscribe(data =>{
      this.goods = data.map(elements =>{
        let obj:any = elements.payload.doc.data();
        return {
          id:elements.payload.doc.id,
          ...obj
        }
      })
    })
  }
  addnewGood(form)
  {
    let name = form.value.name;
    let price = form.value.price;
    let image = this.image.nativeElement.files[0];
    this.goodsSerivce.addnewgood(name,price,image);

  }
  save(index,in1,in2,in3)
  {
    console.log(in3.files[0]);
    if(in3.files[0] != null)
    {
      let ref = this.storage.ref(in3.files[0].name);
      ref.put(in3.files[0]).then(()=>{
        ref.getDownloadURL().subscribe(photoURL =>{
          this.firestore.collection("goods").doc(this.goods[index].id).update({
            name:in1,
            price:in2,
            photoUrl: photoURL
          })    
        })
      })
    }else
    {
      this.firestore.collection("goods").doc(this.goods[index].id).update({
        name:in1,
        price:in2,
      }) 
    }
  }
  delete(index)
  {
    this.firestore.collection("goods").doc(this.goods[index].id).delete();
  }
}
