import { Component } from '@angular/core';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.css'],
})
export class BuyPageComponent {
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
