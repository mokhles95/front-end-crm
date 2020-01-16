import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { Prospect } from 'src/Models/Prospect';
import { UserService } from 'src/Services/UserService';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar, private us : UserService) { }
  prospect:Prospect=new Prospect();

  ngOnInit() {
    this.prospect=JSON.parse(localStorage.getItem('User'));
    console.log(this.prospect.firstName+"     "+this.prospect.lastName)
    this.infoForm = this.formBuilder.group({
      'firstName': [this.prospect.firstName, Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': [this.prospect.lastName, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [this.prospect.email, Validators.compose([Validators.required, emailValidator])]
    });

    this.passwordForm = this.formBuilder.group({
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.prospect.email=this.infoForm.get('email').value;
      this.prospect.firstName=this.infoForm.get('firstName').value;
      this.prospect.lastName=this.infoForm.get('lastName').value;
      localStorage.setItem("User",JSON.stringify(this.prospect))
      this.us.updateProspect(this.prospect).subscribe(data=>{},
        e=>{},
        ()=>{this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      });
      
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.us.resetPassword(this.prospect.email, this.passwordForm.get("newPassword").value).subscribe(res => { console.log(res) },
        e => { },
        () => {
          this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
          
        });
      
    }
  }

}
