import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../../Models/Reservation';
import { QuoteService } from '../../../../Services/QuoteService';
import { ReservationService } from '../../../../Services/ReservationService';
import { Prospect } from 'src/Models/Prospect';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PagesComponent } from '../../pages.component';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservation : Reservation[]=[];
  result : any;
  msgCancel="";
  user : Prospect;
  msgresult="";
  //elementReservation: Reservation=new Reservation();

  constructor(private resserv : ReservationService,private snackBar :MatSnackBar,private appserv : AppService, private resquote:QuoteService,private router : Router) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('User'))
    this.resserv.getMyReservations(this.user.id).subscribe(res=>{this.reservation=JSON.parse(JSON.stringify(res));},
      e=>{},
      ()=>{
        
          this.reservation.forEach(element => {
          element.finishDate=new Date(element.finishDate).toJSON().slice(0,10).split("-").reverse().join("/");
          element.startDate=new Date(element.startDate).toJSON().slice(0,10).split("-").reverse().join("/");
        });
      }

      )
  }
 

  getQuote(){
    this.resquote.getQuote(this.user.id).subscribe(x => {
      // It is necessary to create a new blob object with mime-type explicitly set
      // otherwise only Chrome works like it should
      var newBlob = new Blob([x], { type: "application/pdf" });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(newBlob);
          return;
      }

      // For other browsers: 
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      var link = document.createElement('a');
      link.href = data;
      link.download = "Devis.pdf";
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
          // For Firefox it is necessary to delay revoking the ObjectURL
          window.URL.revokeObjectURL(data);
          link.remove();
      }, 100);
  });;
  }


  checkout(r){
    this.router.navigate(["checkout",r.id]);
  }
  cancelReservation(r){

   this.resserv.cancelReservation(r.id,this.user.id).subscribe(res=>{this.msgCancel=res},
      e=>{},
      ()=>{
        this.reservation=[];
        this.ngOnInit();
        this.appserv.getNbreProdPerCart();
        let message =  'Reservation canceled'; 
    status = 'success';          
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 50000 });
      });
  }
}
