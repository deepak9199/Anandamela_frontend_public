import { Product } from './../../Model/product';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import {
  CartData,
  CartList,
  DeleteCartModel,
  ProductDetails,
  ProductImage,
  SaveLaterList,
  UpdateCartQuantityModel,
  cartApi,
  saveforlatermodel,
} from 'src/app/Model/cart';
import { ProductData } from 'src/app/Model/product';
import { BannerService } from 'src/app/Shared/_services/banner.service';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { HomePageService } from 'src/app/Shared/_services/home-page.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  mobile: boolean;
  ngOnInit() {
    this.mobile = this.isMobileScreen(window.innerWidth);
    console.log(this.mobile);
  }

  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 415) {
      return true;
    } else {
      return false;
    }
  }
}
