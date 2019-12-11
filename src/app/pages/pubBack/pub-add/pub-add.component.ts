import { Component, OnInit } from '@angular/core';
import { PublicityService } from 'src/Services/Publicity/PublicityService';

@Component({
  selector: 'app-pub-add',
  templateUrl: './pub-add.component.html',
  styleUrls: ['./pub-add.component.scss']
})
export class PubAddComponent implements OnInit {

  startdate:Date;
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
  }

  ajouterPub(){

    this.startdateModifier="";
    this.finsihdateModifier="";
    this.startdateModifier=this.startdate.toString().substring(8,10);
    this.startdateModifier=this.startdateModifier+'/';
    this.startdateModifier=this.startdateModifier+this.startdate.toString().substring(5,7);
    this.startdateModifier=this.startdateModifier+'/';
    this.startdateModifier=this.startdateModifier+this.startdate.toString().substring(0,4);

    this.finsihdateModifier=this.finishdate.toString().substring(8,10);
    this.finsihdateModifier=this.finsihdateModifier+'/';
    this.finsihdateModifier=this.finsihdateModifier+this.finishdate.toString().substring(5,7);
    this.finsihdateModifier=this.finsihdateModifier+'/';
    this.finsihdateModifier=this.finsihdateModifier+this.finishdate.toString().substring(0,4);






    this.pubServ.setPub(1,this.idProd,this.startdateModifier,this.finsihdateModifier,this.logo);
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
