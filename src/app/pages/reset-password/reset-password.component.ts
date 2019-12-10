import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { matchingPasswords } from '../../theme/utils/app-validators';
import { UserService } from 'src/Services/UserService';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  validToken: boolean;
  token = "";
  mail = "";
  result = "";

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private us: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });

    this.route.paramMap.subscribe(params => { this.token = params.get('token'); this.mail = params.get('mail'); })
    this.us.tokenVerif(this.token).subscribe(data => { this.result = data; console.log(this.result + "      this is the result") },
      e => { },
      () => {
        if (this.result === "invalid") {
          this.validToken = false;
          this.resetForm.controls['password'].disable();
          this.resetForm.controls['confirmPassword'].disable();
        } else {
          this.validToken = true;
        }

      })

  }
  resendMail() {
    this.us.resendForget(this.mail).subscribe(res => { console.log(res) },
      e => { },
      () => {
        this.snackBar.open('Please check your email for the new link!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
      })
  }

  onResetFormSubmit(form) {
    if (this.resetForm.valid) {
      this.us.resetPassword(this.mail, this.resetForm.get("password").value).subscribe(res => { console.log(res) },
        e => { },
        () => {
          this.snackBar.open('Your password has been changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
          this.router.navigateByUrl('/sign-in');
        });
    }
  }

}
