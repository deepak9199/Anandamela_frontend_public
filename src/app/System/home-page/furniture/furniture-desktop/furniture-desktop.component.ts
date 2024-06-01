import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Banner, ApibannerData } from 'src/app/Model/banner';
import { AddToCartModel } from 'src/app/Model/cart';
import {
  HomePageData,
  HomePageMenuItem,
  HomePageApi,
  HomePage,
} from 'src/app/Model/homePage';
import { imageslide } from 'src/app/Model/imageslider';
import { TrendingProduct, FeaturedProduct } from 'src/app/Model/product';
import { BannerService } from 'src/app/Shared/_services/banner.service';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { HomePageService } from 'src/app/Shared/_services/home-page.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { WishListService } from 'src/app/Shared/_services/wish-list.service';
import { SlideInterface } from 'src/app/Shared/imageSlider/types/slide.interface';

@Component({
  selector: 'app-furniture-desktop',
  templateUrl: './furniture-desktop.component.html',
  styleUrls: ['./furniture-desktop.component.css'],
})
export class FurnitureDesktopComponent {
  loading: boolean = true;
  homepagedata: HomePageData;
  FeaturedProducts: HomePageMenuItem[] = [];
  FeaturedDiscount: HomePageMenuItem[] = [];
  TopOffer: HomePageMenuItem[] = [];
  Appliance: HomePageMenuItem[] = [];
  AppleProducts: HomePageMenuItem[] = [];
  DealsOnAudio: HomePageMenuItem[] = [];
  Brands: HomePageMenuItem[] = [];
  topOfferImg: string;
  // owl option
  product: OwlOptions = {
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
  featurediscount: OwlOptions = {
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
        items: 2,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      840: {
        items: 3,
      },
      940: {
        items: 3,
      },
      1300: {
        items: 3,
      },
    },
    nav: true,
  };
  dealsonaudio: OwlOptions = {
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
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      840: {
        items: 3,
      },
      940: {
        items: 3,
      },
      1300: {
        items: 3,
      },
    },
    nav: true,
  };
  featurediscountonbrands: OwlOptions = {
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
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      840: {
        items: 3,
      },
      940: {
        items: 3,
      },
      1300: {
        items: 3,
      },
    },
    nav: true,
  };
  constructor(
    private toster: ToastrService,
    private token: TokenStorageService,
    private router: Router,
    private homepageservice: HomePageService,
    private cartservice: CartService,
    private sharedService: SharedService,
    private wiselistservice: WishListService,
    private displaymessageService: DisplayMessageService
  ) {}

  ngOnInit(): void {
    this.token.removeCetagory();
    this.trigertsidemenurestrefresh();
    this.scrole();
    this.getHomePageData(2);
  }

  // get home page Api
  private getHomePageData(menuType: number) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.homepageservice
      .get(menuType)
      .pipe(first())
      .subscribe({
        next: (data: HomePageApi) => {
          if (data.msg == 'Successful') {
            this.homepagedata = data.data;
            console.log(this.homepagedata)
            if (data.data.home_page.length != 0) {
              data.data.home_page.map((item: HomePage) => {
                if (item.master_name === 'Top Offer') {
                  this.topOfferImg = item.full_menu_type_image;
                  this.TopOffer = item.menu_items;
                } else if (item.master_name === 'Featured Discount') {
                  this.FeaturedDiscount = item.menu_items;
                } else if (item.master_name === 'Brands') {
                  this.Brands = item.menu_items;
                } else if (item.master_name === 'Appliance') {
                  this.Appliance = item.menu_items;
                } else if (item.master_name === 'Apple Products') {
                  this.AppleProducts = item.menu_items;
                } else if (item.master_name === 'Deals On Audio') {
                  this.DealsOnAudio = item.menu_items;
                } else if (item.master_name === 'Featured Product') {
                  this.FeaturedProducts = item.menu_items;
                }
              });
              this.loading = false;
              this.scrole();
            } else {
              console.log('Item not found');
            }
            // console.log(this.FeaturedProducts);
            // console.log(this.TopOffer, this.FeaturedDiscount, this.FeaturedProducts, this.Brands, this.Appliance, this.AppleProducts, this.DealsOnAudio)
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
        complete: () => {
          this.trigertfootershowrefresh();
        },
      });
  }
  // cart aadd api
  private addtocartApi(data: AddToCartModel) {
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
          console.log(err.error);
          this.displaymessageService.showError('Please Login');
        },
      });
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
          console.log(err.error);
          alert('Please Login');
        }
      );
  }
  // rout function
  routePath(obj: any) {
    // console.log(obj);
    this.token.saveProduct(obj);
    this.router.navigate(['/product']);
  }
  routhpathproductwisepageSlider(obj: any) {
    let objid = {
      cetagoryId: obj.id,
    };
    // console.log(objid)
    this.token.saveCetagory(objid);
    this.router.navigate(['/categoryWiseProdcut']);
  }
  routhpathproductwisepage(obj: any) {
    console.log(obj);
    let objid = {
      cetagoryId: obj.category_id,
    };
    console.log(objid);
    this.token.saveCetagory(objid);
    this.router.navigate(['/categoryWiseProdcut']);
  }
  routhpathproductwisepagebanner(obj: any) {
    console.log(obj);
    let objid = {
      cetagoryId: obj.cetagory_id,
    };
    console.log(objid);
    this.token.saveCetagory(objid);
    this.router.navigate(['/categoryWiseProdcut']);
  }
  // trigered other componet
  private trigertrefresh() {
    this.sharedService.triggerCartFunction();
  }
  private trigertsidemenurestrefresh() {
    this.sharedService.triggersidemenuresetFunction();
  }
  private trigertrefreshwiselist() {
    this.sharedService.triggerwishlistFunction();
  }
  // add to cart function
  addtocart(data: any) {
    console.log(data);
    let obj: AddToCartModel = {
      product_id: data.id.toString(),
      quantity: '1',
    };
    this.addtocartApi(obj);
  }
  // descount calculation function
  discountPer(num1: number, num2: number): number {
    let absoluteDifference = Math.abs(num1 - num2);
    let percentageDifference = (absoluteDifference / num1) * 100;
    return Number(percentageDifference.toFixed(0));
  }
  // add wislist function
  addtowishlist(id: number, index: number, type: string) {
    this.addWishListApi(id);
    if (type === 'tp') {
      let obj: TrendingProduct = this.homepagedata.trending_products[index];
      obj.is_wishlist = '1';
      this.homepagedata.trending_products[index] = obj;
    } else if (type === 'fp') {
      let obj: FeaturedProduct = this.homepagedata.featured_products[index];
      obj.is_wishlist = '1';
      this.homepagedata.featured_products[index] = obj;
    }
  }
  // scrole
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
}
