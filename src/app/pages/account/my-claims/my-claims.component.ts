import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/Models/Claim';
import { Prospect } from 'src/Models/Prospect';
import { Operator } from 'src/Models/Operator';
import { ClaimService } from 'src/Services/ClaimService';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.scss']
})
export class MyClaimsComponent implements OnInit {
listClaim : Claim [] = [];
user: Prospect = new Prospect();
operator : Operator = new Operator();
  constructor(private cs : ClaimService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('User'));
    this.cs.getClaimsByProspect(this.user.id).subscribe(
      result => {
        this.listClaim = JSON.parse(JSON.stringify(result));
      },
      e => { },

  ()=>{ 
    this.listClaim.forEach(element => {
      let elementClaim : Claim = new Claim();
    element.date = new Date(element.date)
    });
    
  });
    
  }

}
