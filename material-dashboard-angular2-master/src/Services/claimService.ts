import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from 'Models/Claim';
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
}