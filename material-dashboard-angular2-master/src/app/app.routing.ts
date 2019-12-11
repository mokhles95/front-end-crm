import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {ListPubComponent} from './pages/pubBack/list-pub/list-pub.component';
import {PubAddComponent} from './pages/pubBack/pub-add/pub-add.component';
import {ModifyPubComponent} from './pages/pubBack/modify-pub/modify-pub.component';
import {FormsModule} from '@angular/forms';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{

      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }, { path: 'listPub',      component:  ListPubComponent},
      { path: 'AddPub',      component:  PubAddComponent},]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
    FormsModule
  ], declarations: [

    PubAddComponent,
    ListPubComponent,
    ModifyPubComponent,

  ],
  exports: [
  ],
})
export class AppRoutingModule { }
