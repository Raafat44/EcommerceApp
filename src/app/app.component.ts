import { Component, DoCheck, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EcommerceApp';
  isuser:boolean;
  username;
  admin = false;
  loading = false;
  constructor(private auth:AuthService,private router:Router,private userService:UserService,private afauth:AngularFireAuth,private firestore : AngularFirestore){
    
      this.router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event);
      });   
  }
 
  navigationInterceptor(event: RouterEvent): void {
    if ( (event instanceof NavigationStart ) ) {       
      this.loading = true;

    }
    if ( (event instanceof NavigationEnd)) {

      setTimeout(() => { // here
        this.loading = false;
      }, 1000);
    }
  }
  ngOnInit(): void {
   
      this.auth.user.subscribe( userp =>{
        if(userp)
        {
          this.isuser = true;        
          this.firestore.collection('users').doc(userp.uid).snapshotChanges().subscribe(a => this.username =  a.payload.data()['name']);
          this.auth.userID = userp.uid;     
          this.firestore.collection('adminVar').doc("SEVYxSt2r8dQyab2kQ8T").snapshotChanges().subscribe(a => this.admin = a.payload.data()['status']);          

        }else
        {
          this.isuser = false;
          this.auth.user = ' ';
          this.username = '.....';
          this.auth.userID = ' ';
        }
        
      })
  }  
 
  logout()
  {
    this.auth.logout().then(()=>{   
      this.firestore.collection("adminVar").doc("SEVYxSt2r8dQyab2kQ8T").set({status : false}) 
      this.router.navigate([''])}
       );
     
  }
  
}
