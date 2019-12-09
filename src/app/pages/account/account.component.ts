import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen:boolean = true;
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Account Information', href: 'information', icon: 'info' },
    { name: 'Addresses', href: 'addresses', icon: 'location_on' },

    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' }, 
    { name: 'My Reclamations', href: 'myClaims', icon: 'assignment' },  

    { name: 'Order History', href: 'orders', icon: 'payment' },
    { name: 'Reservations', href: 'reservations', icon: 'add_shopping_cart' },
    { name: 'Purchases', href: 'purchases', icon: 'description' },
    { name: 'Bills', href: ['bills',0], icon: 'receipt' },
    { name: 'My Reclamations', href: 'myClaims', icon: 'receipt' },
    { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' },    
  ];
  constructor(public router:Router) { }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  }

}
