import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private auth:AuthService,private router:Router,private fs:AngularFirestore) { }
  isAdmin;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any
  {

    return this.auth.valid();
  }
}
