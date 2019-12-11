import { Component, OnInit, Input } from '@angular/core';
import { PublicityService } from 'Services/Publicity/PublicityService';
import { Publicity } from 'Models/Publicity';

@Component({
  selector: 'app-modify-pub',
  templateUrl: './modify-pub.component.html',
  styleUrls: ['./modify-pub.component.scss']
})
export class ModifyPubComponent implements OnInit {
  @Input() id:Publicity;
  startdate=new Date('1988-03-21');
  finishdate:Date;
  idProd:number;
   imageSrc: string;
   url: any;
   logo:string;
   startdateModifier:string;
   finsihdateModifier:string;
   constructor(private pubServ:PublicityService){
   } 
   ngOnInit() {
    this.logo=this.id.ImageUrl;
    console.log(this.startdate+"hiii");
    /*this.finishdate.setDay(+(this.id.FinishDate.substring(0,2)));
       this.finishdate.setMonth(+(this.id.FinishDate.substring(3,5)));
       this.finishdate.setYear(+(this.id.FinishDate.substring(3,5)));*/

   }

   modifyPub(){
     this.pubServ.ModifyPub(this.id.Id,this.logo);
   }
   handleUpload(e):void{
     console.log(this.startdate);
     console.log(this.finishdate);
     console.log(this.idProd);
     this.logo=e.target.value;
     this.logo=this.logo.substring(12);
     //this.logo='assets\\img\\'+this.logo;
     this.logo='assets\\images\\products\\phone\\'+this.logo;
     console.log(this.logo+"hi");
  }
}
