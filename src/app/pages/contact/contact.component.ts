import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { ClaimService } from 'src/Services/ClaimService';
import { Prospect } from 'src/Models/Prospect';
import { Claim } from 'src/Models/Claim';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  claimForm : FormGroup;

  type: string[] = ["financier", "technique","Relationnel" 
  ];

  constructor(public formBuilder: FormBuilder, public fb:FormBuilder, private cs: ClaimService, private snackBar :MatSnackBar,private router : Router) { }
user : Prospect = new Prospect();
claim : Claim = new Claim();

resultMessage :string;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User'));
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });

    this.claimForm = this.fb.group({
      subject: ['',Validators.required],
      content: ['',Validators.required],
      claimType: ['',Validators.required]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {

      console.log(values);
    }
  }

  public onClaimFormSubmit(val ){
    if (this.claimForm.valid){
     // console.log(val)
      this.claim = JSON.parse(JSON.stringify(val));
     // console.log(this.claim.subject)

      this.cs.addClaim(this.claim, this.user.id, this.user.operator.id).subscribe(
        result=> {
          this.resultMessage= result;
        },
        e=> {
  
        },
        ()=> {
          console.log(this.resultMessage);
		  let message =  'Claim passed successfully'; 
    status = 'success';          
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 50000 });
          this.router.navigateByUrl('')
		  this.claim=new Claim();



        }
      )
      console.log(this.user.operator.id)
      console.log(val)
    }
  }
}
