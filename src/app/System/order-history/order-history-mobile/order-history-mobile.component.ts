import { OrderDetail, OrderHistory } from './../../../Model/orderhistory';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first, map } from 'rxjs';
import { OrderHistoryData, OrderHistoryApi } from 'src/app/Model/orderhistory';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { OrderHistoryService } from 'src/app/Shared/_services/order-history.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';

@Component({
  selector: 'app-order-history-mobile',
  templateUrl: './order-history-mobile.component.html',
  styleUrls: ['./order-history-mobile.component.css'],
})
export class OrderHistoryMobileComponent {
  OrderHistory: OrderHistoryData;
  OrderDetaildata: OrderDetail[] = [];
  loading: boolean = false;
  constructor(
    private toster: ToastrService,
    private orderHistoryService: OrderHistoryService,
    private sharedService: SharedService,
    private displaymessageService: DisplayMessageService
  ) {}

  ngOnInit() {
    this.getorderHistoryApi();
  }
  // order history get api
  private getorderHistoryApi() {
    this.loading = true;
    this.trigertfooterhiderefresh();
    this.orderHistoryService
      .getorderhistory()
      .pipe(first())
      .subscribe({
        next: (data: OrderHistoryApi) => {
          console.log(data)
          if (data.status == 'success') {
            this.OrderHistory = data.data;
            console.log(this.OrderHistory);
            this.OrderHistory.order_history.map((item: OrderHistory) => {
              let orderstatus: string =
                item.order_status_log[0].order_status_text;
              let orderproduct: OrderDetail[] = item.order_details;
              orderproduct.map((obj: OrderDetail) => {
                obj.status = orderstatus;
                this.OrderDetaildata.push(obj);
              });
            });
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        error: (err) => {
          // this.geterror()
          //console.log(err.error);
          this.loading = false;
          let obj: OrderHistoryData = {
            order_history: [],
          };
          this.OrderHistory = obj;
          this.displaymessageService.showError('Please Login');
        },
        complete: () => {
          this.loading = false;
          //console.log(this.OrderDetaildata);
          this.trigertfootershowrefresh();
        },
      });
  }
  // footer hide or show triger function
  private trigertfootershowrefresh() {
    this.sharedService.triggerfootershowFunction();
  }
  private trigertfooterhiderefresh() {
    this.sharedService.triggerfooterhideFunction();
  }
}
