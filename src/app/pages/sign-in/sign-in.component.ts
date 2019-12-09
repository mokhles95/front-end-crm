import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { UserService } from 'src/Services/UserService';
import { Prospect } from 'src/Models/Prospect';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user : Prospect= new Prospect();
  
  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,private us:UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
   location.replace('http://localhost:4201/');
    if (this.loginForm.valid ) {
      
      this.us.tryLogin(this.loginForm.get('email').value,this.loginForm.get('password').value).subscribe(result=>{this.user=JSON.parse(JSON.stringify(result))},
        e => {},
        () => {
         console.log(this.user)
          if(this.user!=null){
            localStorage.setItem('User',JSON.stringify(this.user));
            location.replace('/');
           }
          else if(this.user===null) {
            console.log('invalide')
          }
        });
     // this.router.navigate(['/']);
    }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
