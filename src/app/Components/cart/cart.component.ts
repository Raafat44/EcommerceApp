import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cs:CartService,private fs:AngularFirestore,private auth:AuthService) { }
  carts = [];
  obj;
  ngOnInit(): void {
     this.cs.getusercart().subscribe(cart =>
      {
        this.carts = cart.map(shoppping =>{
          this.obj = shoppping.payload.doc.data()
          return{
            id:shoppping.payload.doc.id,
            ...this.obj 
          }
        })
      })
  }
  delete(index)
  {
    this.fs.collection('users/'+ this.auth.userID+"/cart").doc(this.carts[index].id).delete();
  }
  save(index,amount)
  {
    this.fs.collection('users/'+ this.auth.userID+"/cart").doc(this.carts[index].id).update({amount});
  }
}
