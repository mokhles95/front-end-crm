import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from '../products/products.component';
import {ShopsComponent} from './shops.component';


const routes: Routes = [
  { path: 'all', component: ShopsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopsRoutingModule { }
