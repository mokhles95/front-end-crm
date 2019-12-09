import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Data, AppService } from '../../app.service';
import { ReservationService } from 'src/Services/ReservationService';
import { ActivatedRoute, Router } from '@angular/router';
import { Prospect } from 'src/Models/Prospect';
import { emailValidator } from '../../theme/utils/app-validators';
import{PurchaseService} from 'src/Services/PurchaseService';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries = [];
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  msgresultRes:any;
  user : Prospect;

  constructor(private router : Router,private purserv: PurchaseService,private snackBar :MatSnackBar, public appService:AppService,private route: ActivatedRoute, public formBuilder: FormBuilder,private resserv : ReservationService) { }

  ngOnInit() {  
    this.user=JSON.parse(localStorage.getItem('User'))
    this.resserv.getOneReservation(this.route.snapshot.paramMap.get('id') ).subscribe(result=>{this.msgresultRes=result},
    e=>{},
    ()=>{
      if(this.msgresultRes==='no'){
this.router.navigateByUrl('**');
      }
    })
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.cartCount*product.newPrice;
    });
    this.countries = this.appService.getCountries();
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, emailValidator])],
      phone: [this.user.phone, Validators.required],
      zip: ['', Validators.required],
      address: ['', Validators.required]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
    });
  }

  public placeOrder(){
    this.horizontalStepper._steps.forEach(step => step.editable = false);
    this.verticalStepper._steps.forEach(step => step.editable = false);
    this.appService.Data.cartList.length = 0;    
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;

  }

  confirm(){
    this.purserv.Buy(this.route.snapshot.paramMap.get('id'),this.user.id).subscribe(res=>{},e=>{},()=>{
      this.appService.getNbreProdPerCart();
      this.router.navigateByUrl('/account/purchases');
      let message =  'congratulations! We will deliver your products as soon as possible'; 
    status = 'success';          
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 10000 });
    })
  }

}
