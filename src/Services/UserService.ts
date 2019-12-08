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

  tryLogin(login: String, password: string) {
    return this.http.get(this.baseUrl + "/user?login=" + login + "&password=" + password);
  }

  tryRegister(login: String, password: string, first: string, last: string, phone: string, operator: number) {
    return this.http.post(this.baseUrl + "/user?login=" + login + "&pswd=" + password + "&fName=" + first + "&lName=" + last + "&phone=" + phone + "&op=" + operator, null, { responseType: 'text' });
  }

   mailVerif(control: string) {
    return this.http.get(this.baseUrl+"/user/mailVerif?mail="+control, { responseType: 'text' })
  }
}