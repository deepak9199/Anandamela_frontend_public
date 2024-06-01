import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-gate-way',
  templateUrl: './payment-gate-way.component.html',
  styleUrls: ['./payment-gate-way.component.css'],
})
export class PaymentGateWayComponent {
  weburl: any;
  constructor(
    public dialogRef: MatDialogRef<PaymentGateWayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    let url: string = this.data.payment_url + '&embedded=true';
    console.log(url);
    this.weburl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
