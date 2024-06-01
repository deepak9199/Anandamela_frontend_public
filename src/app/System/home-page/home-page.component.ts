import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Shared/_services/auth.service';
import { BannerService } from 'src/app/Shared/_services/banner.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { first } from 'rxjs';
import { ApibannerData, Banner } from 'src/app/Model/banner';
import { SlideInterface } from 'src/app/Shared/imageSlider/types/slide.interface';
import { imageslide } from 'src/app/Model/imageslider';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  electronics: boolean = true
  furniture: boolean = false
  constructor(
  ) { }

  ngOnInit(): void {

  }
  electronicsToggle() {
    this.electronics = true
    this.furniture = false
  }
  furnitureToggle() {
    this.furniture = true
    this.electronics = false
  }

}


