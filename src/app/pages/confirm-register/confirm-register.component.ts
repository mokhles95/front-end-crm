import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/Services/UserService';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent implements OnInit {

  validToken: boolean;
  token = "";
  mail = "";
  result = "";

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private us: UserService, private router : Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => { this.token = params.get('token'); this.mail = params.get('mail'); })
    this.us.tokenVerif(this.token).subscribe(data => { this.result = data; console.log(this.result + "      this is the result") },
      e => { },
      () => {
        if (this.result === "invalid") {
          this.validToken = false;
        } else {
          this.validToken = true;
          this.us.confirmRegister(this.mail).subscribe(res=>{console.log(res)});
        }

      })
  }

  goHome(){
    this.router.navigateByUrl('');
  }

  goSignIn(){
    this.router.navigateByUrl('/sign-in');
  }

  resendRegister(){
    this.us.resendConfirm(this.mail).subscribe(res=>{console.log(res)},
    e=>{},
    ()=>{this.snackBar.open('Please check your email for the new link!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });})
  }

}
