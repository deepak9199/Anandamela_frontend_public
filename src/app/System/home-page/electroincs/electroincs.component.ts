import { Category } from './../../../Model/categories';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Banner, ApibannerData } from 'src/app/Model/banner';
import { AddToCartModel } from 'src/app/Model/cart';
import { categoriesApi } from 'src/app/Model/categories';
import {
  HomePage,
  HomePageApi,
  HomePageData,
  HomePageMenuItem,
} from 'src/app/Model/homePage';
import { imageslide } from 'src/app/Model/imageslider';
import { Daum } from 'src/app/Model/prodcutFilter';
import {
  CetagoryWiseProductPageApi,
  CetagoryWiseProductPageData,
  FeaturedProduct,
  TrendingProduct,
} from 'src/app/Model/product';
import { BannerService } from 'src/app/Shared/_services/banner.service';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { CategoriesService } from 'src/app/Shared/_services/categories.service';
import { HomePageService } from 'src/app/Shared/_services/home-page.service';
import { ProductService } from 'src/app/Shared/_services/product.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { WishListService } from 'src/app/Shared/_services/wish-list.service';
import { SlideInterface } from 'src/app/Shared/imageSlider/types/slide.interface';

@Component({
  selector: 'app-electroincs',
  templateUrl: './electroincs.component.html',
  styleUrls: ['./electroincs.component.css'],
})
export class ElectroincsComponent {
  mobile: boolean;
  ngOnInit() {
    // console.log(window.innerWidth);
    this.mobile = this.isMobileScreen(window.innerWidth);
    // console.log(this.mobile);
  }

  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 655) {
      return true;
    } else {
      return false;
    }
  }
}
