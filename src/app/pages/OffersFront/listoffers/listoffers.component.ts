import { Component, OnInit, Input } from '@angular/core';
import { Prospect } from 'src/Models/Prospect';
import { OfferService } from 'src/Services/OfferService';
import { Settings, AppSettings } from 'src/app/app.settings';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Product } from 'src/app/app.models';
import { ProductDialogComponent } from 'src/app/shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listoffers',
  templateUrl: './listoffers.component.html',
  styleUrls: ['./listoffers.component.scss']
})
export class ListoffersComponent implements OnInit {

  p:Prospect;
  public config: SwiperConfigInterface = {};
  public settings: Settings;
  constructor(private offerServ:OfferService) {}
  Offers:any[]=[];
  image="localhost:4200/assets/images/others/mega_menu_img.png";


  ngOnInit() {
    this.offerServ.getAllOffresCourante().subscribe(result => {
          this.Offers=JSON.parse(JSON.stringify(result));

        },
        e=>{},
        ()=>{

        });
    console.log(this.Offers+"hi");



  }




}
