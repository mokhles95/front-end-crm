import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ProductDialogComponent} from '../../shared/products-carousel/product-dialog/product-dialog.component';
import {AppService} from '../../app.service';
import {Settings, AppSettings} from 'src/app/app.settings';
import {ApiService} from '../../services/api.service';
import {Category} from '../../../Models/category';
import {Product} from '../../../Models/Product';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    @ViewChild('sidenav', {static: true}) sidenav: any;
    public sidenavOpen: boolean = true;
    private sub: any;
    public viewType: string = 'grid';
    public viewCol: number = 25;
    public counts = [12, 24, 36];
    public count: any;
    public sortings = ['Sort by Default', 'Best match', 'Lowest first', 'Highest first'];
    public sort: any;
    public brands = [];
    productList: Product[] = [];
    productClone: Product[] = [];
    categoriesList: Category[] = [];
    public page: any;
    public settings: Settings;

    constructor(public appSettings: AppSettings,
                private activatedRoute: ActivatedRoute,
                public appService: AppService,
                public dialog: MatDialog,
                private router: Router, private api: ApiService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.count = this.counts[0];
        this.sort = this.sortings[0];
        this.sub = this.activatedRoute.params.subscribe(params => {
            //console.log(params['name']);
        });
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
        if (window.innerWidth < 1280) {
            this.viewCol = 33.3;
        }
        ;

        // this.getCategories();
        // this.getBrands();
        // this.getAllProducts();
        this.getProducts();
        this.getCategories();
    }


    filter(catId) {
        if (catId) {
            this.productClone = this.productList.filter(p => p.category.id === +catId);
        } else {
            this.productClone = this.productList;
        }
    }

    getProducts() {
        this.api.get('product/allproducts').subscribe(value => {
            console.log(value);
            this.productList = value;
            this.productClone = value;
        });
    }

    getCategories() {
        this.api.get('category/allcategories').subscribe(value => {
            console.log(value);
            this.categoriesList = value;
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    @HostListener('window:resize')
    public onWindowResize(): void {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
        (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
    }



    public changeSorting(sort) {
        this.sort = sort;
    }

}
