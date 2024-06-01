import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environmentProduct } from '../_baseUrl/environmentVariable';
import { TokenStorageService } from '../_services/token-storage.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css'],
})
export class DefaultPageComponent {
  footerdata: boolean = true;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.trigertfootershowrefresh();
    this.trigertfooterhiderefresh();
  }
  private trigertfootershowrefresh() {
    this.sharedService.functionTriggerObservablefootershow.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.footerdata = true;
    });
  }
  private trigertfooterhiderefresh() {
    this.sharedService.functionTriggerObservablefooterhide.subscribe(() => {
      // this.ngOnInit(); // Call your function here
      this.footerdata = false;
    });
  }
}
