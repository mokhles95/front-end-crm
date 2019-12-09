import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
  })
export  class ReservationService{
baseUrl="/api";

  
    constructor(private http:HttpClient) { }
   
    bookBasket(idProspect){
        return  this.http.post(this.baseUrl+"/reservation/"+idProspect,null,{responseType: 'text'});
    }

    getMyReservations(idProspect){
        return  this.http.get(this.baseUrl+"/reservation/"+idProspect);
    }
    cancelReservation(idReservation,idProspect){
        return  this.http.post(this.baseUrl+"/reservation/"+idReservation+"/"+idProspect,null,{responseType:'text'});
    }
    getOneReservation(id){
        return  this.http.get(this.baseUrl+"/reservation/find/"+id,{responseType: 'text'});
    }



    
}