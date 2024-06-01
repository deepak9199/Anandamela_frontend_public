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
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';

@Component({
  selector: 'app-cart-desktop',
  templateUrl: './cart-desktop.component.html',
  styleUrls: ['./cart-desktop.component.css'],
})
export class CartDesktopComponent {
  loading: boolean = false;
  cartdetails: CartData;
  constructor(
    private toster: ToastrService,
    private token: TokenStorageService,
    private router: Router,
    private cartservice: CartService,
    private sharedService: SharedService
  ) {}
  ngOnInit() {
    this.getcartdetailsApi();
    this.token.removebuynow();
    this.token.removecart();
  }
  // delete cart function
  deletcart(obj: CartList) {
    console.log(obj);
    let Dataobj: DeleteCartModel = {
      cart_id: obj.id.toString(),
    };
    this.deletecartdetailsApi(Dataobj);
  }
  // udpate cart quantity
  updatecartquantityPlus(obj: CartList, quantity: string) {
    // console.log(quantity, obj);
    let updatecartquantity: UpdateCartQuantityModel = {
      cart_id: obj.id.toString(),
      quantity: (Number(quantity) + 1).toString(),
    };
    this.updatecartdetailsApi(updatecartquantity);
  }
  updatecartquantityless(obj: CartList, quantity: string) {
    console.log(quantity, obj);
    if (Number(quantity) > 0) {
      let updatecartquantity: UpdateCartQuantityModel = {
        cart_id: obj.id.toString(),
        quantity: (Number(quantity) - 1).toString(),
      };
      this.updatecartdetailsApi(updatecartquantity);
    } else {
      console.log('error');
    }
  }
  routePath(obj: any) {
    // console.log(obj);
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
  addsaveforlater(obj: CartList) {
    let objdata: saveforlatermodel = {
      cart_id: obj.id.toString(),
    };
    this.addsaveforlaterApi(objdata);
  }
  movetocart(obj: SaveLaterList) {
    let objdata: saveforlatermodel = {
      cart_id: obj.id.toString(),
    };
    this.movetocartApi(objdata);
  }
  // get cart Api
  private getcartdetailsApi() {
    this.loading = true;
    this.cartservice
      .getcartList()
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.msg == 'Successful') {
            this.cartdetails = data.data;
            console.log(this.cartdetails);
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // update cart Api
  private updatecartdetailsApi(update: UpdateCartQuantityModel) {
    this.loading = true;
    this.cartservice
      .updatecartquantity(update)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            this.ngOnInit();
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // delete cart Api
  private deletecartdetailsApi(cartdid: DeleteCartModel) {
    this.loading = true;
    this.cartservice
      .deletecart(cartdid)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            this.trigertrefresh();
            // this.toster.success(data.msg);
            this.ngOnInit();
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // save for later cart Api
  private addsaveforlaterApi(saveforlater: saveforlatermodel) {
    this.loading = true;
    this.cartservice
      .addtosaveforlater(saveforlater)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            // this.toster.success(data.msg);
            this.trigertrefresh();
            this.ngOnInit();
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // move to cart Api
  private movetocartApi(saveforlater: saveforlatermodel) {
    this.loading = true;
    this.cartservice
      .movetocart(saveforlater)
      .pipe(first())
      .subscribe({
        next: (data: cartApi) => {
          if (data.status == 'success') {
            // this.toster.success(data.msg);
            this.trigertrefresh();
            this.ngOnInit();
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  private trigertrefresh() {
    this.sharedService.triggerCartFunction();
  }
}
