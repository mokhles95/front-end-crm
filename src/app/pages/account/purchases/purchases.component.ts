import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/Services/PurchaseService';
import { Purchase } from 'src/Models/Purchase';
import { Prospect } from 'src/Models/Prospect';
import { MatDialog } from '@angular/material';
import { PurchaseDetailsComponent } from '../purchase-details/purchase-details.component';
import { Router } from '@angular/router';
      
@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {
  purchases:Purchase[]=[];
  p:Purchase;
  user : Prospect;
  sum:number;
  constructor(private purchServ : PurchaseService,public dialog:MatDialog,private router: Router) { }

  ngOnInit() {
this.user=JSON.parse(localStorage.getItem('User'));
this.purchServ.Allpurchase(this.user.id).subscribe(result=>{this.purchases=JSON.parse(JSON.stringify(result))},
e=>{},
()=>{
})
  }
  openDialog(r) {
    const dialogRef = this.dialog.open(PurchaseDetailsComponent, {
      width: '450px',height:'420px',
      data: {name: r.product.name, description: r.product.description,price:r.product.price, qte:r.qte}
    });

    
  }
  NavigateToBills(){
    this.router.navigateByUrl('account/bills')
  }

}
