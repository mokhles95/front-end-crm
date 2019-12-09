import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import {MyClaimsComponent} from './my-claims/my-claims.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { BillsComponent } from './bills/bills.component'
export const routes = [
  { 
      path: '', 
      component: AccountComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, data: {  breadcrumb: 'Dashboard' } },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' } },
          { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' } },
          { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orders' } },
          { path: 'myClaims', component: MyClaimsComponent, data: {  breadcrumb: 'claims' } },
          { path: 'reservations', component: ReservationsComponent, data: {  breadcrumb: 'reservation' } },
          { path: 'bills/:id', component: BillsComponent, data: {  breadcrumb: 'bill' } },
          { path: 'purchases', component: PurchasesComponent, data: {  breadcrumb: 'purchase' } }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    MyClaimsComponent,
    ReservationsComponent,
    PurchasesComponent,
    PurchaseDetailsComponent,
    BillsComponent
  ],
  entryComponents:[
    PurchaseDetailsComponent
  ],
})
export class AccountModule { }
