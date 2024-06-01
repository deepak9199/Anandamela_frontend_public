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

@Component({
  selector: 'app-nav-bar-desktop',
  templateUrl: './nav-bar-desktop.component.html',
  styleUrls: ['./nav-bar-desktop.component.css'],
})
export class NavBarDesktopComponent {
  token: string = '';
  cartItemsLength: number = 0;
  wiselistlength: number = 0;
  cetagoryMenuList: boolean = false;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private tokenservice: TokenStorageService,
    private sharedService: SharedService,
    private cartservice: CartService,
    private messageService: MessageService,
    private wiselistservice: WishListService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenservice.getToken();
    this.getcartdetailsApi();
    this.gettrigertrefresh();
    this.gettrigertCartrefresh();
    this.getwishistdetailsApi();
    this.gettrigertwishlistrefresh();
  }
  login() {
    console.log(this.token);
    console.log(this.ValidatorChecker(this.token));
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
      .subscribe(
        (data: cartApi) => {
          if (data.msg == 'Successful') {
            if (data.data.cart_list.length != 0) {
              this.cartItemsLength = data.data.cart_list.length;
            } else {
              this.cartItemsLength = 0;
            }
          } else {
            // this.toster.error(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          console.log(err.error);
        }
      );
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
            // this.toster.error(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          console.log(err.error);
        }
      );
  }
  search(name: string) {
    this.messageService.setmessage(name);
    this.router.navigate(['/categoryWiseProdcut']).then(() => {
      this.sharedService.triggerSearchFunction();
    });
  }
}
