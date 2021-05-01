import { AuthGuard } from './../auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { loginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { AdminordersComponent } from './components/adminorders/adminorders.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {path:'',         component:HomeComponent},
  {path:'account',  component:AccountComponent, canActivate:[AuthGuard]},
  {path:'cart',     component:CartComponent, canActivate:[AuthGuard]},
  {path:'orders',     component:OrdersComponent, canActivate:[AuthGuard]},
  {path:'admin',     component:AdminComponent, canActivate:[AuthGuard]},
  {path:'adminorders',     component:AdminordersComponent, canActivate:[AuthGuard]},
  {path:'login',    component:loginComponent},
  {path:'products', component:ProductsComponent},
  {path:'signup',   component:SignupComponent},
  {path:'**',       component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { 

}
