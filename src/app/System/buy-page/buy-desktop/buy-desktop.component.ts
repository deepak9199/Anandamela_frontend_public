import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import {
  CustomerAddress,
  AddAddressModel,
  DeleteAddressModel,
  AddressApi,
} from 'src/app/Model/address';
import { CartData } from 'src/app/Model/cart';
import { CheckOutModel, checkOutApi } from 'src/app/Model/checkout';
import { CouponData, couponCode } from 'src/app/Model/coupon';
import { ProductData } from 'src/app/Model/product';
import { UserModel } from 'src/app/Model/user';
import { CheckAvailabilityService } from 'src/app/Shared/_services/check-availability.service';
import { CheckOutService } from 'src/app/Shared/_services/check-out.service';
import { CouponService } from 'src/app/Shared/_services/coupon.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';

@Component({
  selector: 'app-buy-desktop',
  templateUrl: './buy-desktop.component.html',
  styleUrls: ['./buy-desktop.component.css'],
})
export class BuyDesktopComponent {
  loading: boolean = false;
  couponDetails: CouponData = {
    payable_amount: 0,
    user_coupon_map_id: 0,
    coupon_id: 0,
    discount_amount: 0,
    total_amount: '',
  };
  couponCodeApplyed: boolean = false;
  codecouponvar: string = '';
  cartDetail: CartData;
  userDetail: UserModel;
  buynow: ProductData;
  isbuynow: boolean;
  iscart: boolean;
  selectedaddressid: number;
  paymentMode: number = 0;
  addressData: CustomerAddress[] = [];
  addaddressform: AddAddressModel = {
    address: '',
    state_id: '',
    pincode: '',
    landmark: '',
    seleted: false,
  };
  constructor(
    private token: TokenStorageService,
    private router: Router,
    private toster: ToastrService,
    private checkoutservice: CheckOutService,
    private applycouponserive: CouponService,
    private displaymessageService: DisplayMessageService,
    private checkavailabilityservice: CheckAvailabilityService
  ) {}

  ngOnInit() {
    this.cartDetail = this.token.getCart();
    this.userDetail = this.token.getUser();
    this.buynow = this.token.getbuynow();
    //console.log();
    if (this.buynow.product.id != 0) {
      this.isbuynow = true;
      this.iscart = false;
      //console.log('buynow');
    } else {
      this.iscart = true;
      this.isbuynow = false;
      //console.log('cart');
    }
    this.scrole();
    this.getAddressDataApi();
  }
  // scrole
  private scrole() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
  // apply coupon function
  applycouponcode(code: string) {
    this.codecouponvar = code;
    if (this.iscart) {
      const value: string = this.cartDetail.item_total.toString();
      let obj: couponCode = {
        coupon_code: code,
        total_cart_amount: value,
      };
      //console.log(obj);
      this.applycouponApi(obj);
    } else if (this.isbuynow) {
      const value: string = this.buynow.product.offer_price.toString();
      let obj: couponCode = {
        coupon_code: code,
        total_cart_amount: value,
      };
      //console.log(obj);
      this.applycouponApi(obj);
    } else {
      //console.log('error');
    }
  }
  // remove coupon function
  removecouponcode() {
    this.codecouponvar = '';
    if (this.couponDetails.user_coupon_map_id != 0) {
      this.removecouponApi(this.couponDetails.user_coupon_map_id);
    } else {
      //console.log('coupon id not found');
    }
  }
  // seleted address
  seletedaddress(obj: CustomerAddress) {
    this.selectedaddressid = obj.id;
  }
  // add address function
  addaddress() {
    this.addaddressform.state_id = '2';
    this.checkavailability(Number(this.addaddressform.pincode));
  }

  deleteaddress(obj: CustomerAddress) {
    let deleteobj: DeleteAddressModel = {
      address_id: obj.id.toString(),
    };
    this.deleteAddressDataApi(deleteobj);
  }
  confirmorder() {
    if (this.ValidatorChecker(this.selectedaddressid)) {
      if (this.paymentMode != 0) {
        if (this.iscart) {
          let checkorder: CheckOutModel = {
            address_id: this.selectedaddressid.toString(),
            payable_amount: this.cartDetail.grand_total.toString(),
            payment_mode: this.paymentMode.toString(),
          };
          //console.log('order confirmed', checkorder);
          this.checkOutApi(checkorder);
        } else if (this.isbuynow) {
          let checkorder: CheckOutModel = {
            address_id: this.selectedaddressid.toString(),
            payable_amount: this.buynow.product.offer_price.toString(),
            payment_mode: this.paymentMode.toString(),
          };
          //console.log('order confirmed', checkorder);
          this.checkOutApi(checkorder);
        }
      } else {
        alert('please select payment Method');
      }
    } else {
      alert('please select address');
    }
  }

  // coupon api apply
  private applycouponApi(obj: couponCode) {
    this.loading = true;
    this.applycouponserive
      .getCoupon(obj)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          //console.log(data);
          if (data.status == 'success') {
            this.couponDetails = data.data;
            //console.log(this.couponDetails);
            this.couponCodeApplyed = true;
            this.displaymessageService.showSuccess(
              'Coupon Applyed Successfuly'
            );
          } else {
            // alert(data.msg);
            this.displaymessageService.showError('Coupon Applyed Successfuly');
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // coupon api remove
  private removecouponApi(obj: number) {
    this.loading = true;
    this.applycouponserive
      .removeCoupon(obj)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          //console.log(data);
          if (data.status == 'success') {
            this.couponDetails = data.data;
            //console.log(this.couponDetails);
            this.couponCodeApplyed = false;
            this.displaymessageService.showSuccess(
              'Coupon Removed Successfully'
            );
          } else {
            alert(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // get address api
  private getAddressDataApi() {
    this.loading = true;
    this.checkoutservice
      .getaddress()
      .pipe(first())
      .subscribe({
        next: (data: AddressApi) => {
          //console.log(data);
          if (data.msg == 'Successfull') {
            this.addressData = data.data.customer_address;
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
  // check-availability api
  private checkavailability(pincode: number) {
    this.loading = true;
    this.checkavailabilityservice
      .checkavailability(pincode)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.scrole();
            this.addAddressDataApi(this.addaddressform);
          } else {
            this.scrole();
            this.displaymessageService.showError(data.msg);
            this.loading = false;
          }
        },
        error: (err) => {
          // this.geterror()
          this.loading = false;
          //console.log(err.error);
        },
      });
  }
  // add address api
  private addAddressDataApi(data: AddAddressModel) {
    this.loading = true;
    this.checkoutservice
      .addaddress(data)
      .pipe(first())
      .subscribe({
        next: (data: AddressApi) => {
          //console.log(data);
          if (data.status == 'success') {
            this.toster.success(data.msg);
            this.getAddressDataApi();
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  // delete address api
  private deleteAddressDataApi(data: DeleteAddressModel) {
    this.loading = true;
    this.checkoutservice
      .deleteaddress(data)
      .pipe(first())
      .subscribe({
        next: (data: AddressApi) => {
          //console.log(data);
          if (data.status == 'success') {
            this.getAddressDataApi();
          } else {
            this.toster.error(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
        },
        complete: () => {
          this.loading = false;
        },
      });
  }

  // check out api
  private checkOutApi(data: CheckOutModel) {
    //console.log(data);
    this.checkoutservice
      .checkout(data)
      .pipe(first())
      .subscribe(
        (data: checkOutApi) => {
          //console.log(data);
          if (data.status == 'success') {
            // //console.log(data.data);
            if (data.data.payment_url == '') {
              this.toster.success('Order Conformed');
              this.router.navigate(['/orderHistory']);
            } else {
              // this.openDialog(data.data);
              //console.log('online');
              // this.location.go(data.data.payment_url);
              window.location.href = data.data.payment_url;
            }
          } else {
            this.toster.error(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          //console.log(err.error);
          this.toster.error('Please Login');
        }
      );
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
  paycash() {
    this.paymentMode = 1;
  }
  payonline() {
    this.paymentMode = 2;
  }
}
