import { Component } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  mobile: boolean;
  ngOnInit(): void {
    this.mobile = this.isMobileScreen(window.innerWidth);
  }
  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 415) {
      return true;
    } else {
      return false;
    }
  }
}
