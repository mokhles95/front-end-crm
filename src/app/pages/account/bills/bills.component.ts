import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/Services/BillService';
import { Bill } from 'src/Models/Bill';
import { ActivatedRoute } from '@angular/router';
import { Prospect } from 'src/Models/Prospect';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {
bills : Bill[]=[];
user :Prospect;
  constructor(private billserv :BillService,private route : ActivatedRoute) { }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('User'))
if(this.route.snapshot.paramMap.get('id')==='0'){
this.billserv.getAllBills(this.user.id).subscribe(result=>this.bills=JSON.parse(JSON.stringify(result)))
}
else{
  console.log('zzz')
}
  }

}
