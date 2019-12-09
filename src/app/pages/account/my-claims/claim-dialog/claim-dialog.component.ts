import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ClaimService } from 'src/Services/ClaimService';
import { Claim } from 'src/Models/Claim';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-dialog',
  templateUrl: './claim-dialog.component.html',
  styleUrls: ['./claim-dialog.component.scss']
})
export class ClaimDialogComponent implements OnInit {
claim :Claim = new Claim();
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private snackBar: MatSnackBar, private cs: ClaimService,  private fb:FormBuilder,private router: Router) { }
  claimForm : FormGroup;
  ngOnInit() {
    this.getClaims();
    this.claimForm = this.fb.group({
      subject: ['',Validators.minLength(1)],
      content: ['',Validators.minLength(1)],
      claimType: ['',Validators.required]
    });
   
  }

  getClaims(){
    this.cs.getClaimById(this.data.idReclamation).subscribe(
      result => {
        console.log(result)
        this.claim = JSON.parse(JSON.stringify(result));
      }, 
      e => {
        console.log("error")
       },)
  }

  
  onClaimFormUpdate(value){
    console.log(value)
    this.claim = JSON.parse(JSON.stringify(value));
    console.log(this.claim)
this.cs.updateClaim(this.data.idReclamation, this.claim).subscribe(
  result=>{
    console.log("updated");
    this.snackBar.open("your claim is updated successfully","x",{panelClass:'success', verticalPosition:'top',duration:5000})
  location.reload(); 
  },
  error=> {
    console.log("error");
  }
  
)
  }



}
