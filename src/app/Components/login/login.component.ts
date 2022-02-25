import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage:string = "";

  constructor(private auService:AuthService,private router:Router,private firestore:AngularFirestore) { }

  ngOnInit(): void {
  }
  login(form)
  {
    
    this.auService.login(form.value.Email,form.value.Password)
    .then(result =>  {
      this.errorMessage = "" 
      this.router.navigate([''])
      if(form.value.Email=="admin@admin.com" && form.value.Password == "123456" )
    {
      this.firestore.collection("adminVar").doc("SEVYxSt2r8dQyab2kQ8T").set({status : true})
    }else
    {
      this.firestore.collection("adminVar").doc("SEVYxSt2r8dQyab2kQ8T").set({status : false})
    }
    })
    .catch(error =>  this.errorMessage = error)
  }
  
}
