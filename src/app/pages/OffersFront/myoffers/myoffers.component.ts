import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/Models/Prospect';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Settings } from 'src/app/app.settings';
import { OfferService } from 'src/Services/OfferService';

@Component({
  selector: 'app-myoffers',
  templateUrl: './myoffers.component.html',
  styleUrls: ['./myoffers.component.scss']
})
export class MyoffersComponent implements OnInit {

  p:Prospect;
  public config: SwiperConfigInterface = {};
  public settings: Settings;
  constructor(private offerServ:OfferService) { }
  Offers:any[]=[];
  image="localhost:4200/assets/images/others/mega_menu_img.png";


  ngOnInit() {
    this.p=JSON.parse(localStorage.getItem('User'));
    this.offerServ.getMyoffers(this.p.id).subscribe(result => {
          this.Offers=JSON.parse(JSON.stringify(result));

        },
        e=>{},
        ()=>{

        });
    console.log(this.Offers+"hi");



  }

}
