import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { AddToCartModel, ProductDetails } from 'src/app/Model/cart';
import { productImage } from 'src/app/Model/imageModel';
import {
  Product,
  ProductApi,
  ProductData,
  ProductImage,
  SimilarProduct,
} from 'src/app/Model/product';
import { CartService } from 'src/app/Shared/_services/cart.service';
import { ProductService } from 'src/app/Shared/_services/product.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { SlideInterface } from 'src/app/Shared/imageSlider/types/slide.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
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
