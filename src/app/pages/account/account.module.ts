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
import { ClaimDialogComponent } from './my-claims/claim-dialog/claim-dialog.component';
import { ClaimDetailsComponent } from './my-claims/claim-details/claim-details.component'
import { MatPaginatorModule } from '@angular/material';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
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
          { path: 'detailClaim/:id', component: ClaimDetailsComponent, data: {  breadcrumb: 'detailClaim' } }
      ]
  },

];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatPaginatorModule,
    PipesModule,
    NgxPaginationModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    MyClaimsComponent,
    ClaimDialogComponent,
    ClaimDetailsComponent
  ],
  entryComponents:[
    ClaimDialogComponent
  ]
})
export class AccountModule { }
