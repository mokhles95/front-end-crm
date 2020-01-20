import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export  class BasketService{
baseUrl="/api";

  
    constructor(private http:HttpClient) { }
   
    addProductToBasket(idProspect:any,idProduct:any){
        
        return  this.http.post(this.baseUrl+"/basket/"+idProspect+"/"+idProduct,null,{responseType: 'text'});
      }
    getBasket(idProspect :any){
        return  this.http.get(this.baseUrl+"/basket/"+idProspect);
    }
    
    removeOneProductFromBasket(idProspect:any,idProduct:any){
      return  this.http.post(this.baseUrl+"/basket/"+idProspect+"/"+idProduct,null,{responseType: 'text'});
    }


    
}