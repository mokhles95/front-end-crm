import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export class PurchaseService{
baseUrl="/api";

    constructor(private http:HttpClient) { }
   
        Buy(id,idProspect){
        return  this.http.post(this.baseUrl+"/purchase/"+id+"/"+idProspect,null,{responseType: 'text'});
        }
      Allpurchase(id){
        return  this.http.get(this.baseUrl+"/purchase/"+id);
      }

}