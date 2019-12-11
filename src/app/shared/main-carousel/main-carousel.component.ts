import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { PublicityService } from 'src/Services/Publicity/PublicityService';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  @Input('slides') slides: Array<any> = [];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  timeLeft: number = 60;
  interval;
  res:any[]=[];
  publicities:any[]=[];
  publicitiesTemp:any[]=[];

  constructor(private pubServ:PublicityService){

  }
  /*
  deletePub(i:number){
    console.log(i+"hello");
    this.pubServ.delete(i);
  }
  */

  startTimer() {

  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    console.log(this.slides);
    this.pauseTimer();
    this.pubServ.getAllPublicityActive().subscribe(result => {
          this.publicities=JSON.parse(JSON.stringify(result));
          console.log( "iam an object"+ Object.keys(this.publicities).length)
        },
        e=>{},
        ()=>{

        });
    ;
    /*
    console.log( this.publicities+"hiii"+"hiii");
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.pubServ.getAllPublicityActive().subscribe(result => {
          this.publicitiesTemp=JSON.parse(JSON.stringify(result));
          if ( Object.keys(this.publicities).length !==  Object.keys(this.publicitiesTemp).length ){
            this.publicities=this.publicitiesTemp;
            console.log("i am her again");
            console.log( Object.keys(this.publicities).length+"hiii");
          }
        },
          e=>{},
          ()=>{

        });
       ;

      } else {
        this.timeLeft = 60;
      }
    },100000)
    */


    /*
      var chart = new myPieChart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
    */





  }




  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }


  }

}
