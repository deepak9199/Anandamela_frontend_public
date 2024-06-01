import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import {
  CartData,
  CartList,
  DeleteCartModel,
  UpdateCartQuantityModel,
  saveforlatermodel,
  SaveLaterList,
  cartApi,
} from 'src/app/Model/cart';
import { ProductData } from 'src/app/Model/product';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';

@Component({
  selector: 'app-cart-mobile',
  templateUrl: './cart-mobile.component.html',
  styleUrls: ['./cart-mobile.component.css'],
})
export class CartMobileComponent {
  cartdetails: CartData;
  loading: boolean;
  constructor(
    private toster: ToastrService,
    private token: TokenStorageService,
    private router: Router,
    private cartservice: CartService,
    private sharedService: SharedService,
    private displaymessageService:DisplayMessageService
  ) {}
  ngOnInit() {
    this.trigertsidemenurestrefresh();
    this.getcartdetailsApi();
    this.token.removebuynow();
    this.token.removecart();
  }
  // delete cart function
  deletcart(obj: CartList) {
    //console.log(obj);
    let Dataobj: DeleteCartModel = {
      cart_id: obj.id.toString(),
    };
    this.deletecartdetailsApi(Dataobj);
  }
  // udpate cart quantity plus
  updatecartquantityPlus(obj: CartList, quantity: string) {
    // //console.log(quantity, obj);
    let updatecartquantity: UpdateCartQuantityModel = {
      cart_id: obj.id.toString(),
      quantity: (Number(quantity) + 1).toString(),
    };
    this.updatecartdetailsApi(updatecartquantity);
  }
  // udpate cart quantity subdtract
  updatecartquantityless(obj: CartList, quantity: string) {
    //console.log(quantity, obj);
    if (Number(quantity) > 0) {
      let updatecartquantity: UpdateCartQuantityModel = {
        cart_id: obj.id.toString(),
        quantity: (Number(quantity) - 1).toString(),
      };
      this.updatecartdetailsApi(updatecartquantity);
    } else {
      //console.log('error');
    }
  }
  // route
  routePath(obj: any) {
    //console.log(obj);
    let product: ProductData = {
      product: {
        id: 0,
        category_id: 0,
        sub_category_id: 0,
        product_api_id: '',
        brand_id: 0,
        brand_name: '',
        class_id: 0,
        class_name: '',
        group_id: 0,
        group_name: '',
        unit_id: 0,
        unit_name: '',
        gst_id: 0,
        gst_price: 0,
        product_name: '',
        product_slug_url: '',
        default_product_image: '',
        product_description: '',
        mrp_price: 0,
        offer_price: 0,
        stock: 0,
        status: '',
        menu_type: '',
        created_at: '',
        updated_at: '',
        deleted_at: undefined,
        full_default_product_image: '',
        menu_type_name: '',
        product_images: [],
        product_attributes: [],
        is_wishlist: '',
      },
      similar_products: [],
      ratings: 0,
      review: [],
      rating_review_count: 0,
      offers: [],
    };
    this.token.savebuynow(product);
    this.token.saveCart(obj);
    this.router.navigate(['/buy']);
  }
  // function for add save for later
  addsaveforlater(obj: CartList) {
    let objdata: saveforlatermodel = {
      cart_id: obj.id.toString(),
    };
    this.addsaveforlaterApi(objdata);
  }
  // function for move to cart
  movetocart(obj: SaveLaterList) {
    let objdata: saveforlatermodel = {
      cart_id: obj.id.toString(),
    };
    this.movetocartApi(objdata);
  }

  // all api function start

  // get cart Api
  private getcartdetailsApi() {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.cartservice
      .getcartList()
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.msg == 'Successful') {
            this.cartdetails = data.data;
            //console.log(this.cartdetails);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
          let obj: CartData = {
            cart_list: [],
            save_later_list: [],
            item_total: 0,
            delivery_charge: 0,
            grand_total: 0,
          };
          this.cartdetails = obj;
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  // update cart Api
  private updatecartdetailsApi(update: UpdateCartQuantityModel) {
    this.cartservice
      .updatecartquantity(update)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            this.ngOnInit();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
      });
  }
  // delete cart Api
  private deletecartdetailsApi(cartdid: DeleteCartModel) {
    this.cartservice
      .deletecart(cartdid)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            this.trigertrefresh();
            // this.displaymessageService.showSuccess(data.msg);
            this.ngOnInit();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
      });
  }
  // save for later cart Api
  private addsaveforlaterApi(saveforlater: saveforlatermodel) {
    this.cartservice
      .addtosaveforlater(saveforlater)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            // this.displaymessageService.showSuccess(data.msg);
            this.trigertrefresh();
            this.ngOnInit();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
      });
  }
  // move to cart Api
  private movetocartApi(saveforlater: saveforlatermodel) {
    this.cartservice
      .movetocart(saveforlater)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            // this.displaymessageService.showSuccess(data.msg);
            this.trigertrefresh();
            this.ngOnInit();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
      });
  }

  // all api function end

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
  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
  // triger function
  private trigertrefresh() {
    this.sharedService.triggerCartFunction();
  }
  private trigertsidemenurestrefresh() {
    this.sharedService.triggersidemenuresetFunction();
  }
}
