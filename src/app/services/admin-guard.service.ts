import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  
  access:boolean;
  access2:boolean;
  constructor(private firestore:AngularFirestore,private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any
  {
  return new Promise(resolve => {
    this.firestore.collection('adminVar').doc("SEVYxSt2r8dQyab2kQ8T").snapshotChanges().subscribe(a =>{
     if(a.payload.data()['status'] == false)
     {
       this.router.navigate([''])
       resolve(false);
     }else
     {
       resolve(true);
     }
    }) 
  }) 
}
  
}
