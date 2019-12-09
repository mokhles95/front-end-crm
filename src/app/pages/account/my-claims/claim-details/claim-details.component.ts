import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClaimService } from 'src/Services/ClaimService';
import { Claim } from 'src/Models/Claim';
import { ClaimDialogComponent } from '../claim-dialog/claim-dialog.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.scss']
})
export class ClaimDetailsComponent implements OnInit {
  id: any;

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router, private cs : ClaimService, private dialog:MatDialog) { }
claim : Claim = new Claim()
  ngOnInit() {
 this.id = this.route.snapshot.paramMap.get('id');
this.cs.getClaimById(this.id).subscribe(
  result => {
    console.log(result)
    this.claim = JSON.parse(JSON.stringify(result));
  }, 
  e => {
    console.log("error")
   },)
  }

  updateClaim(){
    const dialogRef = this.dialog.open(ClaimDialogComponent, {
      width: '500px',
      data: {idReclamation: this.id}
    });

  }

deleteClaim(){
  this.cs.deleteClaim(this.id).subscribe(
result=> {
  this.router.navigate(["account/myClaims"]);
  this.snackBar.open("your claim is deleted successfully","x",{panelClass:'success', verticalPosition:'top',duration:5000})


},
  
  e=> {
    console.log("error")
  }
)
}

}
