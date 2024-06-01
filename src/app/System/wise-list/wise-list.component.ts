import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AddToCartModel } from 'src/app/Model/cart';
import { WishListData, wishListApi } from 'src/app/Model/wishlist';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { WishListService } from 'src/app/Shared/_services/wish-list.service';

@Component({
  selector: 'app-wise-list',
  templateUrl: './wise-list.component.html',
  styleUrls: ['./wise-list.component.css'],
})
export class WiseListComponent {
  wishList: WishListData;
  loading: boolean;
  constructor(
    private token: TokenStorageService,
    private router: Router,
    private toster: ToastrService,
    private wiselistservice: WishListService,
    private cartservice: CartService,
    private sharedService: SharedService,
    private displaymessageService: DisplayMessageService
  ) {}

  ngOnInit() {
    this.trigertsidemenurestrefresh();
    this.getWishListApi();
  }
  // wish list get api
  private getWishListApi() {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.wiselistservice
      .getwishlist()
      .pipe(first())
      .subscribe({
        next: (data: wishListApi) => {
          if (data.status == 'success') {
            // this.displaymessageService.showSuccess(data.msg);
            this.wishList = data.data;
            //console.log(this.wishList);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
          this.loading = false;
          let obj: WishListData = {
            wishlist_products: [],
          };
          this.wishList = obj;
          this.displaymessageService.showError('Please Login');
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  // wish list remove api
  private removWishListApi(producdid: number) {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.wiselistservice
      .removewishlist(producdid)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.trigertrefreshwiselist();
            this.ngOnInit();
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
  removewiselist(id: number) {
    this.removWishListApi(id);
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
        },
        complete: () => {
          this.loading = false;
          this.trigertfootershowrefresh();
        },
      });
  }
  private trigertrefresh() {
    this.sharedService.triggerCartFunction();
  }
  // add to cart function
  addtocart(data: any) {
    //console.log(data);
    let obj: AddToCartModel = {
      product_id: data.id.toString(),
      quantity: '1',
    };
    this.addtocartApi(obj);
  }
  private trigertrefreshwiselist() {
    this.sharedService.triggerwishlistFunction();
  }
  private trigertsidemenurestrefresh() {
    this.sharedService.triggersidemenuresetFunction();
  }
  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
}
