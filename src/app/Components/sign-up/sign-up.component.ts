import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  errorMessage:string = "";
  constructor(private aus:AuthService,private usService:UserService,private router:Router,private firestore:AngularFirestore) { }

  ngOnInit(): void {
  }
signUp(f)
{
  if(f.value.Email=="admin@admin.com" )
    {
      this.firestore.collection("adminVar").doc("SEVYxSt2r8dQyab2kQ8T").set({status : true})
    }else
    {
      this.firestore.collection("adminVar").doc("SEVYxSt2r8dQyab2kQ8T").set({status : false})
    }
  this.aus.signUp(f.value.Email,f.value.Password)
  .then( result =>
    {
      this.errorMessage = ""
      this.usService.addnewUser(result.user.uid,f.value.name).then( ()=> this.router.navigate(['']))
    }
    )
  .catch(error => this.errorMessage = error);
}
}
