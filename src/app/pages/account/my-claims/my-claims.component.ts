import { Component, OnInit, ViewChild } from '@angular/core';
import { Claim } from 'src/Models/Claim';
import { Prospect } from 'src/Models/Prospect';
import { Operator } from 'src/Models/Operator';
import { ClaimService } from 'src/Services/ClaimService';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.scss']
})
export class MyClaimsComponent implements OnInit {
  public page:any;
listClaim : Claim [] = [];
user: Prospect = new Prospect();
operator : Operator = new Operator();
public viewCol: number = 25;
  public counts = [5,10, 15, 20];
  public count:any;
  public viewType: string = 'grid';


@ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  constructor(private cs : ClaimService, private route: Router) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('User'));
    this.count = this.counts[0];
   
    this.getclaims();
  }
  getclaims(){
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

  navigateToDetails(c){
this.route.navigate(["account/detailClaim",c.id])}


public onPageChanged(event){
  this.page = event;
  this.getclaims(); 
  window.scrollTo(0,0); 
}

public changeCount(count){
  this.count = count;
  this.getclaims(); 
}

public changeViewType(viewType, viewCol){
  this.viewType = viewType;
  this.viewCol = viewCol;
}


}


