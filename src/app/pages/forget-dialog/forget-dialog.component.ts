import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, PatternValidator } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/Services/UserService';

@Component({
  selector: 'app-forget-dialog',
  templateUrl: './forget-dialog.component.html',
  styleUrls: ['./forget-dialog.component.scss']
})
export class ForgetDialogComponent implements OnInit {

  forgetForm: FormGroup;
  result = "";

  constructor(public dialogRef: MatDialogRef<ForgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public formBuilder: FormBuilder,private us:UserService,private snackBar: MatSnackBar) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
    this.forgetForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])], 
    });

  }

  onForgetFormSubmit(forgetForm){
    this.us.forgetPassword(forgetForm.get('email').value).subscribe(res=>{this.result=res},
      e=>{},
      ()=>{
         if(this.result==="user not existing"){
          this.snackBar.open('There is no account with this email!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });   
         }else{
          this.snackBar.open('Check your email to reset your password!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
         }
      });
  }

}
