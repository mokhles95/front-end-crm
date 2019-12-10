import { Component, OnInit } from '@angular/core';
import { ClaimService } from 'Services/claimService';
import { Claim } from 'Models/Claim';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-list-claims',
  templateUrl: './list-claims.component.html',
  styleUrls: ['./list-claims.component.scss']
})
export class ListClaimsComponent implements OnInit {

  constructor(private cv :ClaimService) { }
listClaims : Claim []= [];
claim : Claim = new Claim();
  ngOnInit() {
    this.getClaim();
  }

  getClaim(){
    this.cv.getClaims().subscribe(
      result => {
        this.listClaims = JSON.parse(JSON.stringify(result))
      },
      error =>{
console.log("eror")
      }
    )
  }

}
