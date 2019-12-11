
    import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prospect } from 'Models/Prospect';
@Injectable({
    providedIn: 'root'
  })
export class OfferService{
baseUrl="/api";
p:Prospect;
    constructor(private http:HttpClient) { }
   
    
    SuggestedOfferClient(id:number){
        return  this.http.get(this.baseUrl+"Offer//clientSuggestOffer?id=1");
      }
    getAllOffresCourante(){
        return  this.http.get(this.baseUrl+"Offer/AllOffreCourante");
    }
    getMyoffers(i:number ){
      this.p=JSON.parse(localStorage.getItem('User'));
      return  this.http.get(this.baseUrl+"Offer//clientSuggestOffer?id="+i.toString());
  }
   getAllNombreOffre(){
          
            return  this.http.get(this.baseUrl+"Offer/nombrecurrentOffre");
            
      
        }
        getAllProductNumbre(){
          
            return  this.http.get(this.baseUrl+"Offer/nombreProducts");
            
      
        }
}
