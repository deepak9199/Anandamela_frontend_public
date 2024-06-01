import { changepass } from './../../Model/change_pass';
import { Link, chnagepageModel } from './../../Model/prodcutFilter';
import { Product } from './../../Model/homePage';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AddToCartModel } from 'src/app/Model/cart';
import {
  Daum,
  ProductFilterApi,
  ProductFilterData,
  Products,
} from 'src/app/Model/prodcutFilter';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { MessageService } from 'src/app/Shared/_services/message.service';
import { ProductFilterService } from 'src/app/Shared/_services/product-filter.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { WishListService } from 'src/app/Shared/_services/wish-list.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';

@Component({
  selector: 'app-category-wise-product-page',
  templateUrl: './category-wise-product-page.component.html',
  styleUrls: ['./category-wise-product-page.component.css'],
})
export class CategoryWiseProductPageComponent {
  ProductFilterData: ProductFilterData = {
    products: undefined,
    filter_category: [],
    filter_brand: [],
    filter_attribute: [],
  };
  itemloading: boolean = false;
  mobile: boolean;
  loading: boolean;
  pricelowhighfilteroption: boolean = false;
  FilterAttribute: boolean = false;
  FilterBrand: boolean = false;
  FilterCategory: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4,
      },
      400: {
        items: 4,
      },
      740: {
        items: 5,
      },
      940: {
        items: 8,
      },
    },
    nav: true,
  };
  private chnagepagedata: any;
  // owl option
  banner: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    items: 1,
    navSpeed: 500,
    navText: ['', ''],
    nav: true,
  };
  constructor(
    private productfilterservice: ProductFilterService,
    private toster: ToastrService,
    private token: TokenStorageService,
    private router: Router,
    private cartservice: CartService,
    private sharedService: SharedService,
    private messageservice: MessageService,
    private wiselistservice: WishListService,
    private displaymessageService: DisplayMessageService
  ) {}
  ngOnInit() {
    this.mobile = this.isMobileScreen(window.innerWidth);
    this.gettrigertrefresh();
    this.start();
  }
  start() {
    let name: string = this.messageservice.getmessage();
    if (name === '') {
      //console.log('getproductFilterApi');
      let cetagoryid: string = this.token.getCetagory().cetagoryId;
      if (cetagoryid != '') {
        this.scrole();
        this.getproductFilterApi(Number(cetagoryid));
        this.token.removebuynow();
        this.token.removecart();
      } else {
        this.router.navigate(['/']);
      }
    } else {
      //console.log('getproductFilterSearchApi');
      this.scrole();
      this.getproductFilterSearchApi(name);
      this.token.removebuynow();
      this.token.removecart();
    }
  }
  // infinite scrolle
  scrolleddown() {
    //console.log('scrolled down');
    this.nextpage();
  }

  pricelowhighfilteroptionshow() {
    if (this.pricelowhighfilteroption == false) {
      this.pricelowhighfilteroption = true;
    } else if (this.pricelowhighfilteroption == true) {
      this.pricelowhighfilteroption = false;
    }
  }

  // filter function by cat id
  getfilterfunction(id: number) {
    //console.log(id);
    this.getproductFilterApi(id);
    this.closeNav();
  }
  // filter function by brand id
  getfilterbybrand(id: number) {
    this.getproductFilterbrandApi(id);
    this.closeNav();
  }

  // scrole
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  // calculate discount per%
  discountPer(num1: number, num2: number): number {
    let absoluteDifference = Math.abs(num1 - num2);
    let percentageDifference = (absoluteDifference / num1) * 100;
    return Number(percentageDifference.toFixed(0));
  }
  // add to cart function
  addtocart(data: Daum) {
    //console.log(data);
    let obj: AddToCartModel = {
      product_id: data.id.toString(),
      quantity: '1',
    };
    this.addtocartApi(obj);
  }
  // bou now
  buynow(obj: Daum) {
    this.token.savebuynow(obj);
    this.router.navigate(['/buy']);
  }

  // route function
  routePathProduct(obj: any) {
    // //console.log(obj);
    this.token.saveProduct(obj);
    this.router.navigate(['/product']);
  }
  routhpathproductwisepagebanner(obj: any) {
    //console.log(obj);
    let objid = {
      cetagoryId: obj.cetagory_id,
    };
    //console.log(objid);
    this.token.saveCetagory(objid);
    this.router.navigate(['/categoryWiseProdcut']);
  }
  // rout function ends

  // function for add to wise list
  addtowishlist(id: number, index: number, type: string) {
    this.addWishListApi(id);
    if (type === 'cp') {
      let obj: Daum = this.ProductFilterData.products.data[index];
      obj.is_wishlist = '1';
      this.ProductFilterData.products.data[index] = obj;
    }
  }
  // filter side nav close
  closeNav() {
    document.getElementById('mySidenavcetagory').style.width = '0';
  }
  // filter side nav copen
  openNav() {
    document.getElementById('mySidenavcetagory').style.width = '250px';
  }
  // filter menu on off function
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
  // sorting function
  shortlowtohigh() {
    this.ProductFilterData.products.data.sort(
      (a, b) => a.offer_price - b.offer_price
    );
  }
  shorthightolow() {
    this.ProductFilterData.products.data.sort(
      (a, b) => b.offer_price - a.offer_price
    );
  }
  shortAZ() {
    this.ProductFilterData.products.data.sort((a, b) => {
      if (a.product_name < b.product_name) return -1;
      if (a.product_name > b.product_name) return 1;
      return 0;
    });
  }
  shortZA() {
    this.ProductFilterData.products.data.sort((a, b) => {
      if (a.product_name > b.product_name) return -1;
      if (a.product_name < b.product_name) return 1;
      return 0;
    });
  }
  shortdislowtohigh() {
    this.ProductFilterData.products.data.sort(
      (a, b) =>
        this.discountPer(a.mrp_price, a.offer_price) -
        this.discountPer(b.mrp_price, b.offer_price)
    );
  }
  shordisthightolow() {
    this.ProductFilterData.products.data.sort(
      (a, b) =>
        this.discountPer(b.mrp_price, b.offer_price) -
        this.discountPer(a.mrp_price, a.offer_price)
    );
  }
  // sorting function end

  // change page function
  previouspage() {
    let obj: chnagepageModel = {
      url: this.ProductFilterData.products.links[0].url,
      data: this.chnagepagedata,
    };
    //console.log(obj);
    if (this.ValidatorChecker(obj.url)) {
      this.chnagepageApi(obj);
    } else {
      //console.log('no more page found');
    }
  }
  nextpage() {
    //console.log(this.ProductFilterData.products.links);
    let obj: chnagepageModel = {
      url: this.ProductFilterData.products.links[
        this.ProductFilterData.products.links.length - 1
      ].url,
      data: this.chnagepagedata,
    };
    //console.log(obj);
    if (this.ValidatorChecker(obj.url)) {
      this.chnagepageApi(obj);
    } else {
      //console.log('no more page found');
    }
  }
  // wish list add api
  private addWishListApi(productid: number) {
    this.wiselistservice
      .addwishlist(productid)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status == 'success') {
            // this.displaymessageService.showSuccess(data.msg);
            this.trigertrefreshwiselist();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          this.displaymessageService.showError('Please Login');
          //console.log(err.error);
          alert('Please Login');
        }
      );
  }

  // all api functions start

  // cart api
  private addtocartApi(data: AddToCartModel) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.cartservice
      .addtocart(data)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.trigertrefresh();
            this.displaymessageService.showSuccess(data.msg);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
          this.displaymessageService.showError('Please Login');
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  //categories api filter bu cat id
  private getproductFilterApi(cetagoryid: number) {
    this.chnagepagedata = this.token.getCetagory();
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.productfilterservice
      .getProductFilter(cetagoryid)
      .pipe(first())
      .subscribe({
        next: (data: ProductFilterApi) => {
          if (data.msg == 'Successful') {
            this.ProductFilterData = data.data;
            //console.log(this.ProductFilterData);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          this.loading = false;
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh;
        },
      });
  }
  //categories api filter by name
  private getproductFilterSearchApi(name: string) {
    this.chnagepagedata = {
      search_name: name,
    };
    //console.log('api called');
    this.loading = true;
    this.productfilterservice
      .SearchProduct(name)
      .pipe(first())
      .subscribe({
        next: (data: ProductFilterApi) => {
          if (data.msg == 'Successful') {
            this.ProductFilterData = data.data;
            //console.log(this.ProductFilterData);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          this.loading = false;
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  //categories api filter by brand
  private getproductFilterbrandApi(id: number) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    //console.log('api called');
    this.productfilterservice
      .getProductFilterbrand(id)
      .pipe(first())
      .subscribe({
        next: (data: ProductFilterApi) => {
          if (data.msg == 'Successful') {
            this.ProductFilterData = data.data;
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
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  // change page api
  private chnagepageApi(chnagepageModel: chnagepageModel) {
    this.itemloading = true;
    this.productfilterservice
      .changepage(chnagepageModel)
      .pipe(first())
      .subscribe({
        next: (data: ProductFilterApi) => {
          if (data.msg == 'Successful') {
            let oldData: Daum[] = this.ProductFilterData.products.data;
            // this.loading = false;
            this.ProductFilterData = data.data;
            this.ProductFilterData.products.data = [
              ...oldData,
              ...this.ProductFilterData.products.data,
            ];
            //console.log(this.ProductFilterData);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          // this.loading = false;
          //console.log(err.error);
        },
        complete: () => {
          //console.log('fetching completed');
          this.itemloading = false;
        },
      });
  }

  // all api functions ends

  //validator for undefine empty null data 0
  private ValidatorChecker(data: any) {
    if (
      typeof data === 'undefined' ||
      data === null ||
      data.toString() === '' ||
      data.toString() === '0' ||
      Number.isNaN(data)
    ) {
      return false;
    } else {
      return true;
    }
  }
  // screen view function
  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 655) {
      return true;
    } else {
      return false;
    }
  }
  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
  // triger function
  private trigertrefreshwiselist() {
    this.sharedService.triggerwishlistFunction();
  }
  private gettrigertrefresh() {
    this.sharedService.functionTriggerObservableSearch.subscribe(() => {
      let name: string = this.messageservice.getmessage();
      if (name != '') {
        this.getproductFilterSearchApi(name);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  private trigertrefresh() {
    this.sharedService.triggerCartFunction();
  }
}
