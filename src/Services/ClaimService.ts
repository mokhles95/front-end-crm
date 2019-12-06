import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from 'src/Models/Claim';
@Injectable({
    providedIn: 'root'
  })
export class ClaimService{
baseUrl="/api";

    constructor(private http:HttpClient) { }

 usersUrl:string="/api/claim";
getClaims():Observable<any[]>{
return this.http.get<any[]>(this.usersUrl);
}

getClaimsByProspect(idp){
  return this.http.get(this.usersUrl+"/claimProspect?id_prospect="+idp);
  }


addClaim(c:Claim,idp: any,ido:any){
  return  this.http.post(this.baseUrl+"/claim?id_prospect="+idp+"&idOperator="+ido,c, {responseType:'text'});
}

}