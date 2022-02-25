import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Goods } from 'src/app/interfaces/goods';
import { CartService } from 'src/app/services/cart.service';
import { GoodsService } from 'src/app/services/goods.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy{

  goods:Goods[] = [];
  isUser:boolean;
  isAdmin:boolean;
  obj;
  data;
  goodsobserv:Subscription;
  constructor(private goodsService:GoodsService,private cs:CartService,private fs:AngularFirestore,private afauth : AngularFireAuth,private auth:AuthService) { }

  ngOnInit(): void {
    this.goodsobserv = this.goodsService.getAllGoods().subscribe(data =>
      {
        
        this.goods = data.map(element =>{
          this.obj = element.payload.doc.data()
          return {
            id:element.payload.doc.id,
            ...this.obj
          }
        })
      }     
     /*  data.forEach(a => this.goods.push( 
        {
         id: a.payload.doc.id,
         price : a.payload.doc.data()['price'],
         name :a.payload.doc.data()['name'],
         photoUrl : a.payload.doc.data()['photoUrl']
        }
         )) */

    );
  }
  ngOnDestroy(): void {
    this.goodsobserv.unsubscribe();
  }
  addToCart(index,amount)
  {
    if(amount == 0)
    {
      let selected = this.goods[index];
       this.data = {
        name : selected.name,
        amount : 1,
        photoUrl : selected.photoUrl,
        price : selected.price
      }
    }else
    {
      let selected = this.goods[index];
       this.data = {
        name : selected.name,
        amount : amount,
        photoUrl : selected.photoUrl,
        price : selected.price
      }
    }
    this.cs.addtoCart(this.data);
  }
 
  validation(){
    this.isUser =  this.auth.isUser;
    this.isAdmin = this.auth.isAdmin;
    return (!(this.isUser) || this.isAdmin)
  } 
}
