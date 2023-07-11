import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarttComponent } from './admin/cartt/cartt.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AboutComponent } from './users/about/about.component';
import { CartComponent } from './users/cart/cart.component';
import { ContactComponent } from './users/contact/contact.component';
import { ProductComponent } from './users/product/product.component';
import { SingleLocalComponent } from './users/single-local/single-local.component';
import { SingleProductComponent } from './users/single-product/single-product.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'singleProduct/:id', component: SingleProductComponent },
  { path: 'SingleLocalComponent/:index', component: SingleLocalComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'adminCart', component: CarttComponent },
  { path: 'contact', component: ContactComponent }, 
  { path: 'cart', component: CartComponent },
  { path: '',  redirectTo: '/product', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
