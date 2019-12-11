import { Component, OnInit } from '@angular/core';
import {Shop} from '../../../Models/Shop';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  public viewCol: number = 25;
  shopList: Shop[] = [];
  shopClone: Shop[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getShops();
  }
  filter(event) {
    const name = event.target.value;
    if (name !== '') {
      this.shopClone = this.shopList.filter(p => p.name.toLocaleLowerCase().includes(name.toLowerCase()));
    } else {
      this.shopClone = this.shopList;
    }
  }
  getShops() {
    this.api.get('shop/allshops').subscribe(value => {
      console.log(value);
      this.shopList = value;
      this.shopClone = value;
    });
  }

}
