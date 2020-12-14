import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';
import { ItemComponent } from './item/item.component';
import { ItemViewComponent } from './item-view/item-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component : LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order', component: OrderComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item-view', component: ItemViewComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
