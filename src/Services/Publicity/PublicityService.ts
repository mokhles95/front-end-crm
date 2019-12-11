import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
  export class PublicityService{
    baseUrl="/api";
    
        constructor(private http:HttpClient) { }
      
       
        setPub(idAgent:number,idProd:number,startdate:string,finishdate:string,logo:string){
            console.log("hi");
            console.log(startdate+"i'm a date");
            console.log(idAgent+"i'm a agent");
            const  params = new  HttpParams({fromString:  '_startdate=06/11/2019&_finishdate=08/12/2019&_image=/achraf/pidev8&_idprod=1'});
            this.http.post(this.baseUrl+"Publicity/"+"add?startdate="+startdate+"&finishdate="+finishdate+"&image="+logo+"&"+"idprod="+idProd+"&idAgent=1",null,{responseType: 'text'})
           .subscribe(
                data  => {
                console.log("POST Request is successful ", data);
                },
                error  => {
                
                console.log("Error", error);
                
                })
            
          }
    ModifyPub(idProd:number,logo:string){
        console.log("hi");

        this.http.put(this.baseUrl+"Publicity/"+"?image="+logo.toString()+"&id="+idProd,null,{responseType: 'text'})
            .subscribe(
                data  => {
                    console.log("Update Request is successful ", data);
                },
                error  => {

                    console.log("it's not good ", error);

                })

    }

          getAllPublicity(){
            return  this.http.get(this.baseUrl+"Publicity");
          }
          getAllPublicityActive(){
            return  this.http.get(this.baseUrl+"Publicity/PubActive");
          }
          delete(i:number){
            console.log(i+"i am here fellas");
            return this.http.delete(this.baseUrl+"Publicity"+"?id="+i).subscribe(
              data  => {
              console.log("delete Request is successful ", data);
              },
              error  => {
              
              console.log("Error", error);
              
              })
          ;
          }
    }