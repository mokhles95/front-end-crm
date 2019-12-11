import { Component, OnInit } from '@angular/core';
import { PublicityService } from 'src/Services/Publicity/PublicityService';
import { Publicity } from 'src/Models/Publicity';

@Component({
  selector: 'app-list-pub',
  templateUrl: './list-pub.component.html',
  styleUrls: ['./list-pub.component.scss']
})
export class ListPubComponent implements OnInit {
  test=false;
  timeLeft: number = 60;
  interval;
  res:any[]=[];
  publicities:Publicity[]=[];
  publicitiesTemp:Publicity[]=[];

  id:Publicity=new Publicity();

  constructor(private pubServ:PublicityService){

  }
  modifierPub(id:number){
    this.test=true;
    for(let pub  of this.publicities ){
      if (pub.Id==id){
        this.id=pub;
      }

    }

  }

  deletePub(i:number){
    console.log(i+"hello");
    this.pubServ.delete(i);
  }
  startTimer() {

  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    this.pubServ.getAllPublicity().subscribe(result => {
          this.publicities=JSON.parse(JSON.stringify(result));
        },
        e=>{},
        ()=>{

        });
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        this.pubServ.getAllPublicity().subscribe(result => {
              this.publicitiesTemp=JSON.parse(JSON.stringify(result));
              if (this.publicitiesTemp!==this.publicities){
                this.publicities=this.publicitiesTemp
              }
            },
            e=>{},
            ()=>{

            });

      } else {
        this.timeLeft = 60;
      }
    },10000)
    /*
       var chart = new myPieChart(ctx, {
         type: 'pie',
         data: data,
         options: options
     });
     */





  }

}
