import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { OrderHistoryApi, OrderHistoryData } from 'src/app/Model/orderhistory';
import { OrderHistoryService } from 'src/app/Shared/_services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent {
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
