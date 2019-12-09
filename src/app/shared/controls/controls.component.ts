import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { BasketService } from 'src/Services/BasketService';
import { Prospect } from 'src/Models/Prospect';
import { CartService } from 'src/Services/CartService';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: Product;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();
  public count:number = 1;
  user : Prospect;
  msgResultAdd : any;
  res : any[];
  public align = 'center center';
  constructor(public appService:AppService, public snackBar: MatSnackBar,private basketserv : BasketService) { }

  ngOnInit() {
    if(this.product){
      if(this.product.cartCount > 0){
        this.count = this.product.cartCount;
      }
    }  
    this.layoutAlign(); 
  }

  public layoutAlign(){
    if(this.type == 'all'){
      this.align = 'space-between center';
    }
    else if(this.type == 'wish'){
      this.align = 'start center';
    }
    else{
      this.align = 'center center';
    }
  }



  public increment(count){
    if(this.count < this.product.availibilityCount){
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
    else{
      this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }    
  }

  public decrement(count){
    if(this.count > 1){
      this.count--;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.newPrice
      }
      this.changeQuantity(obj);
    }
  }

  public addToCompare(product:Product){
    this.appService.addToCompare(product);
  }

  public addToWishList(product:Product){
    this.appService.addToWishList(product);
  }

  public addToCart(product:Product){
this.user=JSON.parse(localStorage.getItem('User'));
   /* let currentProduct = this.appService.Data.cartList.filter(item=>item.id == product.id)[0];
    if(currentProduct){
      if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
        product.cartCount = currentProduct.cartCount + this.count;
      }
      else{
        this.snackBar.open('You can not add more items than available. In stock ' + this.product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cartCount = this.count;
    }*/
    this.basketserv.addProductToBasket(this.user.id,product.id).subscribe(result=>{this.msgResultAdd=result},
      e=>{},
      ()=>{
        if(this.msgResultAdd==='added successfully'){
          /*this.basketserv.getBasket(this.user.id).subscribe(result=>{this.res=JSON.parse(JSON.stringify(result))},
          e=>{},
          ()=>{
            let nbre=0;
            this.res.forEach(element => {
              nbre+=element.qte;
            });
            CartService.cartQte=nbre;
          }
          )*/
          product.cartCount = this.count;
          this.appService.addToCart(product);
        }
      })

    
  }

  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value){
      this.onQuantityChange.emit(value);
  }

}