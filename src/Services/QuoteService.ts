import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class QuoteService{
baseUrl="/api";
 headers = new Headers({ 
  'Content-Type':  'application/json',
  'Authorization': 'my-auth-token'
});
    constructor(private http:HttpClient) { }
   
    getQuote(idProspect){
        return  this.http.get(this.baseUrl+"/quote/"+idProspect,{ responseType: 'blob' });
      }
}