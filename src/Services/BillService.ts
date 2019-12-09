import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from 'src/Models/Claim';
@Injectable({
    providedIn: 'root'
  })
export class BillService{
baseUrl="/api";

    constructor(private http:HttpClient) { }


getAllBills(idProspect){
return this.http.post(this.baseUrl+"/bill/"+idProspect,null);
}

getPuurchaseBill(idPurchase){
    return this.http.get(this.baseUrl+"/bill?idPurchase="+idPurchase);
    }

}