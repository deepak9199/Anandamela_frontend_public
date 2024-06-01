import { CouponApi, CouponData, couponCode } from './../../../Model/coupon';
import { CouponService } from './../../../Shared/_services/coupon.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { ProductData } from 'src/app/Model/product';
import { UserModel } from 'src/app/Model/user';
import { CheckOutService } from 'src/app/Shared/_services/check-out.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { PaymentGateWayComponent } from '../../auth/payment-gate-way/payment-gate-way.component';
import { CheckAvailabilityService } from 'src/app/Shared/_services/check-availability.service';
import { Location } from '@angular/common';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';

@Component({
  selector: 'app-buy-mobile',
  templateUrl: './buy-mobile.component.html',
  styleUrls: ['./buy-mobile.component.css'],
})
export class BuyMobileComponent {
  loading: boolean;
  couponCodeApplyed: boolean = false;
  codecouponvar: string = '';
  cartDetail: CartData;
  userDetail: UserModel;
  couponDetails: CouponData = {
    payable_amount: 0,
    user_coupon_map_id: 0,
    coupon_id: 0,
    discount_amount: 0,
    total_amount: '',
  };
  buynow: any;
  isbuynow: boolean;
  iscart: boolean;
  saveaddress: boolean = false;
  canceladdress: boolean = true;
  selectedaddressid: number;
  selectedaddressaddress: string = '';
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
    private sharedService: SharedService,
    public dialog: MatDialog,
    private checkavailabilityservice: CheckAvailabilityService,
    private location: Location,
    private applycouponserive: CouponService,
    private displaymessageService: DisplayMessageService
  ) {}

  ngOnInit() {
    this.trigertsidemenurestrefresh();
    this.getAddressDataApi();
  }
  start() {
    this.cartDetail = this.token.getCart();
    this.userDetail = this.token.getUser();
    this.buynow = this.token.getbuynow();
    console.log(this.buynow);
    if (this.hasAttribute(this.buynow, 'id')) {
      if (this.buynow.id != 0) {
        this.isbuynow = true;
        this.iscart = false;
        console.log('buynow');
      } else {
        this.iscart = true;
        this.isbuynow = false;
        console.log('cart');
      }
      this.scrole();
      this.loading = false;
      this.trigertfootershowrefresh();
    } else {
      if (this.buynow.product.id != 0) {
        this.isbuynow = true;
        this.iscart = false;
        console.log('buynow');
      } else {
        this.iscart = true;
        this.isbuynow = false;
        console.log('cart');
      }
      this.scrole();
      this.loading = false;
      this.trigertfootershowrefresh();
    }
  }
  // apply coupon function
  applycouponcode(code: string) {
    this.codecouponvar = code;
    const totalAmountElement = document.getElementById('totalAmount');
    if (totalAmountElement) {
      const value: string = totalAmountElement.textContent?.trim() || '';
      let obj: couponCode = {
        coupon_code: code,
        total_cart_amount: value,
      };
      console.log(obj);
      this.applycouponApi(obj);
    } else {
      console.error('Element with id "totalAmount" not found.');
    }
  }
  // remove coupon function
  removecouponcode() {
    this.codecouponvar = '';
    if (this.couponDetails.user_coupon_map_id != 0) {
      this.removecouponApi(this.couponDetails.user_coupon_map_id);
    } else {
      console.log('coupon id not found');
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
  hasAttribute(obj: any, attributeName: string): boolean {
    return attributeName in obj;
  }
  // seleted address
  seletedaddress(obj: CustomerAddress) {
    this.selectedaddressid = obj.id;
    this.selectedaddressaddress = obj.address;
  }
  addnewaddress() {
    console.log('click');
    this.canceladdress = false;
    this.saveaddress = true;
  }
  cancleaddress() {
    console.log('click');
    this.canceladdress = true;
    this.saveaddress = false;
  }
  // add address function
  addaddress() {
    this.addaddressform.state_id = '2';
    this.checkavailability(Number(this.addaddressform.pincode));
  }
  // delete address function
  deleteaddress(obj: CustomerAddress) {
    let deleteobj: DeleteAddressModel = {
      address_id: obj.id.toString(),
    };
    this.deleteAddressDataApi(deleteobj);
  }
  // check functioon
  confirmorder() {
    if (this.ValidatorChecker(this.selectedaddressid)) {
      if (this.paymentMode != 0) {
        if (this.couponCodeApplyed) {
          let checkorder: CheckOutModel = {
            address_id: this.selectedaddressid.toString(),
            payable_amount: this.couponDetails.payable_amount.toString(),
            payment_mode: this.paymentMode.toString(),
          };
          console.log('order confirmed', checkorder);
          this.checkOutApi(checkorder);
        } else {
          if (this.iscart) {
            let checkorder: CheckOutModel = {
              address_id: this.selectedaddressid.toString(),
              payable_amount: this.cartDetail.grand_total.toString(),
              payment_mode: this.paymentMode.toString(),
            };
            console.log('order confirmed', checkorder);
            this.checkOutApi(checkorder);
          } else if (this.isbuynow) {
            let checkorder: CheckOutModel = {
              address_id: this.selectedaddressid.toString(),
              payable_amount: this.buynow.product.offer_price.toString(),
              payment_mode: this.paymentMode.toString(),
            };
            console.log('order confirmed', checkorder);
            this.checkOutApi(checkorder);
          }
        }
      } else {
        alert('please select payment Method');
      }
    } else {
      alert('please select address');
    }
  }

  openDialog(url: any): void {
    // console.log(url);
    this.dialog.open(PaymentGateWayComponent, {
      data: url,
    });
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

  // paymnet selection function start

  // cash
  paycash() {
    this.paymentMode = 1;
  }
  // comline
  payonline() {
    this.paymentMode = 2;
  }

  // paymnet selection function ends

  // all api function start

  // coupon api apply
  private applycouponApi(obj: couponCode) {
    this.loading = true;
    this.applycouponserive
      .getCoupon(obj)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.status == 'success') {
            this.couponDetails = data.data;
            console.log(this.couponDetails);
            this.couponCodeApplyed = true;
          } else {
            alert(data.msg);
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
  // coupon api remove
  private removecouponApi(obj: number) {
    this.loading = true;
    this.applycouponserive
      .removeCoupon(obj)
      .pipe(first())
      .subscribe({
        next: (data: any) => {
          console.log(data);
          if (data.status == 'success') {
            this.couponDetails = data.data;
            console.log(this.couponDetails);
            this.couponCodeApplyed = false;
          } else {
            alert(data.msg);
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
  // get address api
  private getAddressDataApi() {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.checkoutservice
      .getaddress()
      .pipe(first())
      .subscribe({
        next: (data: AddressApi) => {
          console.log(data);
          if (data.msg == 'Successfull') {
            this.addressData = data.data.customer_address;
            // console.log(this.addressData);
            this.start();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
      });
  }
  // add address api
  private addAddressDataApi(data: AddAddressModel) {
    this.checkoutservice
      .addaddress(data)
      .pipe(first())
      .subscribe({
        next: (data: AddressApi) => {
          console.log(data);
          if (data.status == 'success') {
            this.displaymessageService.showSuccess(data.msg);
            this.saveaddress = false;
            this.getAddressDataApi();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
      });
  }
  // delete address api
  private deleteAddressDataApi(data: DeleteAddressModel) {
    this.checkoutservice
      .deleteaddress(data)
      .pipe(first())
      .subscribe({
        next: (data: AddressApi) => {
          console.log(data);
          if (data.status == 'success') {
            this.getAddressDataApi();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
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
          console.log(err.error);
        },
      });
  }
  // check out api
  private checkOutApi(data: CheckOutModel) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    console.log(data);
    this.checkoutservice
      .checkout(data)
      .pipe(first())
      .subscribe({
        next: (data: checkOutApi) => {
          console.log(data);
          if (data.status == 'success') {
            // console.log(data.data);
            if (data.data.payment_url == '') {
              this.displaymessageService.showSuccess('Order Conformed');
              this.router.navigate(['/orderHistory']);
            } else {
              // this.openDialog(data.data);
              console.log('online');
              // this.location.go(data.data.payment_url);
              window.location.href = data.data.payment_url;
            }
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
          this.displaymessageService.showError('Please Login');
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }

  // all api function ends

  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
  // trriger function
  private trigertsidemenurestrefresh() {
    this.sharedService.triggersidemenuresetFunction();
  }
}
