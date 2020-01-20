import { Component, OnInit, HostListener, ViewChild } from '@angular/core'; 
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { Category, Product } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { Prospect } from 'src/Models/Prospect';
import { BasketService } from 'src/Services/BasketService';
import { CartService } from 'src/Services/CartService';
import { Basket } from 'src/Models/Basket';
import { ReservationService } from 'src/Services/ReservationService';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ SidenavMenuService ]
})
export class PagesComponent implements OnInit {
  public showBackToTop:boolean = false; 
  public categories:Category[];
  public category:Category;
  public sidenavMenuItems:Array<any>;
  nbprod:number;
  res : any[];
  user :Prospect = new Prospect();
  basket : Basket[];
  vide : string;
  totalPrice:number=0;
  msgRemoveProd="";
  msgBooking="";
  title:string
  @ViewChild('sidenav', { static: true }) sidenav:any;

  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public appService:AppService, 
              public sidenavMenuService:SidenavMenuService,
              public router:Router,
              private basketserv : BasketService,
              private bookserv : ReservationService,
              private snackBar :MatSnackBar) { 
    this.settings = this.appSettings.settings; 
  }

  ngOnInit() {
    this.user=JSON.parse(localStorage.getItem('User'))
	if(this.user!=null){
      this.title="Oreedoo";
      if(this.user.operator.id==1)
      this.settings.theme = 'red'; 
    } 
    else this.title="CRM APP"
    this.getCategories();
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    this.appService.getNbreProdPerCart();
  } 

  public getCategories(){    
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.category = data[0];
      this.appService.Data.categories = data;
    })
  }

  public changeCategory(event){
    if(event.target){
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
    }
    if(window.innerWidth < 960){
      this.stopClickPropagate(event);
    } 
  }

  public remove(product) {
    this.basketserv.removeOneProductFromBasket(this.user.id,product.idProduct).subscribe(result=>{this.msgRemoveProd=result},
      e=>{},
      ()=>{
        if(this.msgRemoveProd==='removed successfully'){
          this.ngOnInit();
        }
      })
      const index: number = this.appService.Data.cartList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.cartList.splice(index, 1);
          this.appService.Data.totalPrice = this.appService.Data.totalPrice - product.newPrice*product.cartCount;
          this.appService.Data.totalCartCount = this.appService.Data.totalCartCount - product.cartCount;
          this.appService.resetProductCartCount(product);
      }        
  }

  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.appService.Data.cartList.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
  }
 

  public changeTheme(theme){
    this.settings.theme = theme;       
  }

  public stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

  public search(){}

 
  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => { window.scrollTo(0,0) });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;  
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        this.sidenav.close(); 
      }                
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus(){
    if(window.innerWidth < 960){
      this.sidenavMenuService.closeAllSubMenus();
    }    
  }
  getBasket(){
    
    this.totalPrice=0;
    this.basketserv.getBasket(this.user.id).subscribe(result=>{this.basket=JSON.parse(JSON.stringify(result))},
    e=>{},
    ()=>{
      console.log(this.basket)
      if(this.basket.length!=-1){
        this.vide="no"
      }
      this.basket.forEach(element => {
      this.totalPrice+=(element.price)*element.qte;
    });
    
  }
    )
  }

  bookCart(){
    this.bookserv.bookBasket(this.user.id).subscribe(result=>{this.msgBooking=result},
      e=>{},
      ()=>{
        if(this.msgBooking==='ok'){
          this.router.navigateByUrl('/account/reservations');
    let message =  'You passed a reservation and you should pay it in two days'; 
    status = 'success';          
    this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 10000 });
        }
        else if(this.msgBooking==='you have already a reservation'){
          let message = 'you have already a reservation'; 
          status = 'error';          
          this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 10000 });
        }
      })


  }

}