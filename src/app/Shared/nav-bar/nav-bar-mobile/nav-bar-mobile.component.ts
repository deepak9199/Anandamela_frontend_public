import { CategoriesService } from 'src/app/Shared/_services/categories.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { cartApi } from 'src/app/Model/cart';
import { wishListApi } from 'src/app/Model/wishlist';
import { LoginComponent } from 'src/app/System/auth/login/login.component';
import { CartService } from '../../_services/cart.service';
import { MessageService } from '../../_services/message.service';
import { SharedService } from '../../_services/shared.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { WishListService } from '../../_services/wish-list.service';
import { ProductFilterService } from '../../_services/product-filter.service';
import {
  Daum,
  ProductFilterApi,
  ProductFilterData,
  Products,
} from 'src/app/Model/prodcutFilter';
import { ToastrService } from 'ngx-toastr';
import { CategoryData, categoriesApi } from 'src/app/Model/categories';
import { CouponApi, CouponData } from 'src/app/Model/coupon';
import { CouponService } from '../../_services/coupon.service';
import { DisplayMessageService } from '../../_services/display-message.service';
@Component({
  selector: 'app-nav-bar-mobile',
  templateUrl: './nav-bar-mobile.component.html',
  styleUrls: ['./nav-bar-mobile.component.css'],
})
export class NavBarMobileComponent {
  showfilterlist: boolean = false;
  categorylist: CategoryData;
  token: string = '';
  cartItemsLength: number = 0;
  wiselistlength: number = 0;
  cetagoryMenuList: boolean = false;
  FilterAttribute: boolean = false;
  FilterBrand: boolean = false;
  FilterCategory: boolean = false;
  catloading: boolean = true;
  transcription: string = '';
  ProductFilterData: ProductFilterData = {
    products: undefined,
    filter_category: [],
    filter_brand: [],
    filter_attribute: [],
  };
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tokenservice: TokenStorageService,
    private sharedService: SharedService,
    private cartservice: CartService,
    private messageService: MessageService,
    private wiselistservice: WishListService,
    private messageservice: MessageService,
    private productfilterservice: ProductFilterService,
    private categoryservice: CategoriesService,
    private toster: ToastrService,
    private displaymessageService: DisplayMessageService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenservice.getToken();
    //console.log(this.token);
    this.getcartdetailsApi();
    this.gettrigertrefresh();
    this.gettrigertCartrefresh();
    this.getwishistdetailsApi();
    this.gettrigertwishlistrefresh();
    this.gettrigertsidemenurefresh();
    this.gettrigertsidemenureset();
    this.gettrigerredreshvoice();
    this.getcetagoryApi(1);
  }

  setcategorydata(obj: any) {
    let objid = {
      cetagoryId: obj.id,
    };
    this.tokenservice.saveCetagory(objid);
    this.router.navigate(['/categoryWiseProdcut']).then(() => {
      this.closeNav();
      this.closeNavcat();
    });
  }
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }
  openNavcat() {
    document.getElementById('mySidenavcat').style.width = '250px';
  }
  onoffFilterAttribute() {
    if (this.FilterAttribute == false) {
      this.FilterAttribute = true;
    } else {
      this.FilterAttribute = false;
    }
  }
  onoffFilterBrand() {
    if (this.FilterBrand == false) {
      this.FilterBrand = true;
    } else {
      this.FilterBrand = false;
    }
  }
  onoffFilterCategory() {
    if (this.FilterCategory == false) {
      this.FilterCategory = true;
    } else {
      this.FilterCategory = false;
    }
  }
  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
  closeNavcat() {
    document.getElementById('mySidenavcat').style.width = '0';
  }
  // trigert side menu cat refrsh
  gettrigertsidemenurefresh() {
    this.sharedService.functionTriggerObservablesodemenu.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.Cetagoryieswiseproductpage();
    });
  }
  Cetagoryieswiseproductpage() {
    //console.log('Cetagoryieswiseproductpage');
    this.showfilterlist = true;
    let name: string = this.messageservice.getmessage();
    if (name === '') {
      let cetagoryid: string = this.tokenservice.getCetagory().cetagoryId;
      if (cetagoryid != '') {
        this.getproductFilterApi(Number(cetagoryid));
      } else {
        //console.log('not cart id found');
      }
    } else {
      this.getproductFilterSearchApi(name);
    }
  }
  //categories filter by cat idapi
  private getproductFilterApi(cetagoryid: number) {
    this.productfilterservice
      .getProductFilter(cetagoryid)
      .pipe(first())
      .subscribe(
        (data: ProductFilterApi) => {
          if (data.msg == 'Successful') {
            this.ProductFilterData = data.data;
            //console.log(this.ProductFilterData);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          //console.log(err.error);
        }
      );
  } //categories api
  private getcetagoryApi(cetagoryid: number) {
    this.categoryservice
      .getcategoriesList(cetagoryid)
      .pipe(first())
      .subscribe({
        next: (data: categoriesApi) => {
          if (data.msg == 'Successful') {
            this.categorylist = data.data;
            //console.log(this.ProductFilterData);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
        complete: () => {
          this.catloading = false;
        },
      });
  }
  //categories filter by cat name api
  private getproductFilterSearchApi(name: string) {
    //console.log('api called');
    this.productfilterservice
      .SearchProduct(name)
      .pipe(first())
      .subscribe(
        (data: ProductFilterApi) => {
          if (data.msg == 'Successful') {
            this.ProductFilterData = data.data;
            //console.log(this.ProductFilterData);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          //console.log(err.error);
        }
      );
  }
  login() {
    //console.log(this.token);
    //console.log(this.ValidatorChecker(this.token));
    if (this.ValidatorChecker(this.token)) {
      this.router.navigate(['/profile']);
    } else {
      this.openDialog();
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }
  //validator for undefine empty null data
  private ValidatorChecker(data: any) {
    if (
      typeof data === 'undefined' ||
      data === null ||
      data.toString() === '' ||
      Number.isNaN(data)
    ) {
      return false;
    } else {
      return true;
    }
  }
  gettrigertsidemenureset() {
    this.sharedService.functionTriggerObservablesodemenureset.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.showfilterlist = false;
    });
  }
  gettrigertrefresh() {
    this.sharedService.functionTriggerObservable.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.token = this.tokenservice.getToken();
      this.getcartdetailsApi();
    });
  }
  gettrigertCartrefresh() {
    this.sharedService.functionTriggerCartObservable.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.getcartdetailsApi();
    });
  }
  gettrigerredreshvoice() {
    this.sharedService.functionTriggerObservablevoice.subscribe(() => {
      let voice: string = this.messageService.getmessage();
      if (voice != 'I am Listening stoped') {
        console.log(voice);
        this.search(voice);
      } else {
        console.log('No voice Found');
      }
    });
  }
  gettrigertwishlistrefresh() {
    this.sharedService.functionTriggerObservablewishlist.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.getwishistdetailsApi();
    });
  }
  cetagoryMenuListSwitch() {
    if (this.cetagoryMenuList == true) {
      this.cetagoryMenuList = false;
    } else if (this.cetagoryMenuList == false) {
      this.cetagoryMenuList = true;
    }
  }
  // get cart Api
  private getcartdetailsApi() {
    this.cartservice
      .getcartList()
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.msg == 'Successful') {
            if (data.data.cart_list.length != 0) {
              this.cartItemsLength = data.data.cart_list.length;
            } else {
              this.cartItemsLength = 0;
            }
          } else {
            // this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
      });
  }
  routtocart() {
    this.router.navigate(['/cart']);
  }
  // get wiselist Api
  private getwishistdetailsApi() {
    this.wiselistservice
      .getwishlist()
      .pipe(first())
      .subscribe(
        (data: wishListApi) => {
          if (data.msg == 'Successful') {
            if (data.data.wishlist_products.length != 0) {
              this.wiselistlength = data.data.wishlist_products.length;
            } else {
              this.cartItemsLength = 0;
            }
          } else {
            // this.displaymessageService.showError(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          //console.log(err.error);
        }
      );
  }

  search(name: string) {
    //console.log('search');
    this.messageService.setmessage(name);
    this.router.navigate(['/categoryWiseProdcut']).then(() => {
      this.sharedService.triggerSearchFunction();
    });
  }
  profile() {
    if (this.ValidatorChecker(this.tokenservice.getToken())) {
      this.router.navigate(['/profile']);
    } else {
      this.displaymessageService.showError('Please login');
    }
  }
}
