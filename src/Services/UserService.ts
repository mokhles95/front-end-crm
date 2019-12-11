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

  agentLogin(login: String, password: string) {
    return this.http.get(this.baseUrl + "/user/agent?login=" + login + "&password=" + password);
  }

  tryRegister(login: String, password: string, first: string, last: string, phone: string, operator: number) {
    return this.http.post(this.baseUrl + "/user?login=" + login + "&pswd=" + password + "&fName=" + first + "&lName=" + last + "&phone=" + phone + "&op=" + operator, null, { responseType: 'text' });
  }

  mailVerif(control: string) {
    return this.http.get(this.baseUrl + "/user/mailVerif?mail=" + control, { responseType: 'text' })
  }

  forgetPassword(mail:string){
    return this.http.post(this.baseUrl+"/user/forgetPassword?login="+mail,null,{ responseType: 'text' })
  }

  tokenVerif(token: string) {
    return this.http.get(this.baseUrl + "/user/"+ token, { responseType: 'text' })
  }
  
  resendForget(login: String) {
    return this.http.post(this.baseUrl + "/user/resendForget?login=" + login, null, { responseType: 'text' });
  }

  resetPassword(mail:string,pswd:string){
    return this.http.put(this.baseUrl + "/user/resetPassword?username="+mail+"&psw="+pswd, null, { responseType: 'text' });
  }

  resendConfirm(login: String) {
    return this.http.post(this.baseUrl + "/user/resendRegister?login=" + login, null, { responseType: 'text' });
  }

  confirmRegister(login : string){
    return this.http.put(this.baseUrl + "/user/confirm/"+login, null, { responseType: 'text' });
  }

}