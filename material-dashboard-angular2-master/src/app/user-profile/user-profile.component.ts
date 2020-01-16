import { Component, OnInit } from '@angular/core';
import { Agent } from 'Models/Agent';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

agent: Agent = new Agent()
  constructor() { }

  ngOnInit() {
    this.agent=JSON.parse(localStorage.getItem('agent'));
  }

}
