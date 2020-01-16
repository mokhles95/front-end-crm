import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "/api";
  result = "";

  constructor(private http: HttpClient) { }

  getAgent(id: String) {
    return this.http.get(this.baseUrl + "/user/currentAgent?id=" + id);
  }

  getOperatorProspects(id : String){
    return this.http.get(this.baseUrl + "/user/allProspects?id=" + id);
  }


}