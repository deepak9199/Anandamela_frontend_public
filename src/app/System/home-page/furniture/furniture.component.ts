import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Banner, ApibannerData } from 'src/app/Model/banner';
import { imageslide } from 'src/app/Model/imageslider';
import { BannerService } from 'src/app/Shared/_services/banner.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { SlideInterface } from 'src/app/Shared/imageSlider/types/slide.interface';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.css'],
})
export class FurnitureComponent {
  mobile: boolean;
  ngOnInit() {
    console.log(window.innerWidth);
    this.mobile = this.isMobileScreen(window.innerWidth);
    console.log(this.mobile);
  }

  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 655) {
      return true;
    } else {
      return false;
    }
  }
}
