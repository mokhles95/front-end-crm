import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { UserService } from 'src/Services/UserService';
import { Prospect } from 'src/Models/Prospect';
import {MatDialog} from '@angular/material/dialog';
import { ForgetDialogComponent } from '../forget-dialog/forget-dialog.component';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  user : Prospect= new Prospect();
  registerResult = ";"
  exist =""
  
  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,private us:UserService,private dialog: MatDialog) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'phoneNumber': ['', Validators.compose([Validators.required,Validators.pattern('[259][0-9]{7}')])],
      'operator': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {

    if (this.loginForm.valid ) {
      
      this.us.tryLogin(this.loginForm.get('email').value,this.loginForm.get('password').value).subscribe(result=>{this.user=JSON.parse(JSON.stringify(result))},
        e => {},
        () => {
         console.log(this.user)
          if(this.user!=null){
            if(!this.user.confirmed){
              this.snackBar.open('you need to confirm your registration first!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
            }else
            if(this.user.disabled){
              this.snackBar.open('this account is disabled please reactivate your account first!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
            }
            else{
            localStorage.setItem('User',JSON.stringify(this.user));
            location.replace('/');
            }
           }
          else if(this.user===null) {
            this.snackBar.open('Please verify your email or password!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });    
          }
        });
    }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      this.us.tryRegister(this.registerForm.get('email').value,this.registerForm.get('password').value,this.registerForm.get('name').value,this.registerForm.get('lastName').value,this.registerForm.get('phoneNumber').value,this.registerForm.get('operator').value).subscribe(result=>{this.registerResult = result},
        e => {},
        ()=> {
          this.snackBar.open('You registered successfully, Please check your email to confirm your registration!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
        })
    }
  }

  public mailVerification() {
   this.us.mailVerif(this.registerForm.get('email').value).subscribe(res=>{this.exist=res},
    e=>{},
    ()=>{
      if(this.exist==="yes"){
        return this.registerForm.get('email').setErrors({existingMail: true})
      }
    })
    
}

openDialog(): void {
  const dialogRef = this.dialog.open(ForgetDialogComponent, {
    width: '600px',height: '250px'
  });

  dialogRef.afterClosed().subscribe(result => {
    

  });
}

}
