import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { first, map } from 'rxjs';
import { Brand, BrandApi } from 'src/app/Model/brands';
import { AddToCartModel } from 'src/app/Model/cart';
import { productImage } from 'src/app/Model/imageModel';
import {
  ProductData,
  ProductApi,
  ProductImage,
  SimilarProduct,
  Review,
} from 'src/app/Model/product';
import { ReviewData } from 'src/app/Model/review';
import { BrandsService } from 'src/app/Shared/_services/brands.service';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { CheckAvailabilityService } from 'src/app/Shared/_services/check-availability.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { ProductService } from 'src/app/Shared/_services/product.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { WishListService } from 'src/app/Shared/_services/wish-list.service';

@Component({
  selector: 'app-product-mobile',
  templateUrl: './product-mobile.component.html',
  styleUrls: ['./product-mobile.component.css'],
})
export class ProductMobileComponent {
  specification: boolean = true;
  fromreview: ReviewData = {
    review: '',
    name: '',
    email: '',
    mobile: '',
  };
  comapre: boolean = false;
  review: boolean = false;
  selectedImage: string;
  private phoneno: number = 9199731275;
  imageSize = 430;
  productDetils: ProductData;
  productImages: productImage[] = [];
  brandsData: Array<Brand> = [];
  loading: boolean = true;
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
  product: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    items: 1,
    navSpeed: 700,
    navText: ['', ''],
    nav: true,
  };
  productnav: OwlOptions = {
    loop: true,
    autoplay: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    items: 1,
    navSpeed: 700,
    navText: ['', ''],
    nav: false,
  };
  featurediscount: OwlOptions = {
    loop: true,
    autoplay: false,
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
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  constructor(
    private token: TokenStorageService,
    private router: Router,
    private productservice: ProductService,
    private toster: ToastrService,
    private cartservice: CartService,
    private sharedService: SharedService,
    private wiselistservice: WishListService,
    private brandsservice: BrandsService,
    private checkavailabilityservice: CheckAvailabilityService,
    private displaymessageService: DisplayMessageService
  ) {}

  ngOnInit() {
    this.trigertsidemenurestrefresh();
    this.start();
  }
  // add review
  Addreview() {
    //console.log(this.fromreview);
  }
  // start function
  private start() {
    let productid: string = this.token.getProduct().id;
    this.fromreview.name = this.token.getUser().name;
    this.fromreview.email = this.token.getUser().email;
    this.fromreview.mobile = this.token.getUser().phone;
    // let productid: string = '7784';
    if (productid != '') {
      this.getProductDataApi(Number(productid));
      this.token.removebuynow();
      this.token.removecart();
    } else {
      this.router.navigate(['/']);
    }
  }
  routePath(obj: any) {
    // //console.log(obj);
    this.token.saveProduct(obj);
    this.router.navigate(['/product']).then(() => {
      window.location.reload();
    });
  }
  discountPer(num1: number, num2: number): number {
    let absoluteDifference = Math.abs(num1 - num2);
    let percentageDifference = (absoluteDifference / num1) * 100;
    return Number(percentageDifference.toFixed(0));
  }
  addtowishlist(id: number, index: number, type: string) {
    this.addWishListApi(id);
    if (type === 'sp') {
      let obj: SimilarProduct = this.productDetils.similar_products[index];
      obj.is_wishlist = '1';
      this.productDetils.similar_products[index] = obj;
    }
  }
  addtowishlistForProduct(id: number) {
    this.addWishListApi(id);
    this.productDetils.product.is_wishlist = '1';
  }
  // spec
  clickspec() {
    this.specification = true;
    this.comapre = false;
    this.review = false;
  }
  // add to cart function
  addtocart(data: any) {
    //console.log(data);
    let obj: AddToCartModel = {
      product_id: data.product.id.toString(),
      quantity: '1',
    };
    this.addtocartApi(obj);
  }
  // add to comapre cart function
  Comapreaddtocart(data: any) {
    //console.log(data);
    let obj: AddToCartModel = {
      product_id: data.id.toString(),
      quantity: '1',
    };
    this.addtocartApi(obj);
  }
  // compare
  clickcom() {
    this.specification = false;
    this.comapre = true;
    this.review = false;
  }
  buynow(obj: ProductData) {
    this.token.savebuynow(obj);
    this.router.navigate(['/buy']);
  }
  // comapre
  comparebuynow(obj: any) {
    this.token.savebuynow(obj);
    this.router.navigate(['/buy']);
  }
  // review
  clickreview() {
    this.specification = false;
    this.comapre = false;
    this.review = true;
  }
  // change image
  changeimage(image: string) {
    this.selectedImage = image;
  }
  // check pincode
  checkpincode(pincode: string) {
    this.checkavailability(Number(pincode));
  }
  // scrole
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  // set product images
  private setproductimage(productDetils: ProductData) {
    if (productDetils.product.product_images.length != 0) {
      this.productDetils.product.product_images.map((image: ProductImage) => {
        this.productImages.push({ url: image.full_product_image });
      });
    } else {
      this.productImages = [{ url: 'assets/product/images/noimage.jpg' }];
    }
  }
  // product api
  private getProductDataApi(productid: number) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.productservice
      .getproductdeatil(productid)
      .pipe(first())
      .subscribe({
        next: (data: ProductApi) => {
          if (data.msg == 'Successful') {
            this.productDetils = data.data;
            //console.log(this.productDetils);
            this.setproductimage(this.productDetils);
            this.getBrands(1);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          this.loading = false;
          //console.log(err.error);
        },
        complete: () => {},
      });
  }
  //brands api
  private getBrands(menuType: number) {
    this.brandsservice
      .getbrands(menuType)
      .pipe(first())
      .subscribe({
        next: (data: BrandApi) => {
          if (data.msg == 'Successful') {
            //console.log('Brands');
            this.brandsData = data.data.brands;
            this.loading = false;
            this.scrole();
          } else {
            this.displaymessageService.showError(data.msg);
            this.loading = false;
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
  //check-availability api
  private checkavailability(pincode: number) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.checkavailabilityservice
      .checkavailability(pincode)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.msg == 'success') {
            this.scrole();
            alert(data.msg);
          } else {
            this.scrole();
            this.confirmAction(data.msg);
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
  // wish list add api
  private addWishListApi(productid: number) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.wiselistservice
      .addwishlist(productid)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status == 'success') {
            // this.displaymessageService.showSuccess(data.msg);
            this.trigertrefreshwiselist();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          this.displaymessageService.showError('Please Login');
          //console.log(err.error);
          alert('Please Login');
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
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
          alert('Please Login');
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  // whatapp
  private openWhatsApp(phoneno: number) {
    // Construct the WhatsApp URL with the phone number
    const whatsappUrl = 'https://wa.me/' + phoneno;

    // Open WhatsApp in a new tab or window
    window.open(whatsappUrl, '_blank');
  }
  confirmAction(msg: string) {
    const result = window.confirm(
      msg + ' Connect with Anandamela in whatsApp?'
    );

    if (result) {
      // User clicked "OK", perform the action
      this.performAction();
    } else {
      // User clicked "Cancel" or closed the dialog
      // You can handle this case or do nothing
    }
  }
  private performAction() {
    // Implement the action to be performed after confirmation
    this.openWhatsApp(this.phoneno);
  }
  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
  // trigger refresh
  private trigertrefresh() {
    this.sharedService.triggerCartFunction();
  }
  private trigertsidemenurestrefresh() {
    this.sharedService.triggersidemenuresetFunction();
  }
  private trigertrefreshwiselist() {
    this.sharedService.triggerwishlistFunction();
  }
}
