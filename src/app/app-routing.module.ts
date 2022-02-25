import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { GoodsComponent } from './Components/goods/goods.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotAllowedComponent } from './Components/not-allowed/not-allowed.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { AdminGuardService } from './services/admin-guard.service';
import { GuardService } from './services/guard.service';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignUpComponent},
  {path:'cart',component:CartComponent ,canActivate:[GuardService]}, 
  {path:'admin',component:GoodsComponent,canActivate:[AdminGuardService]},
  {path:'Not-Allowed!',component:NotAllowedComponent}, 
  {path:'**',component:NotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
