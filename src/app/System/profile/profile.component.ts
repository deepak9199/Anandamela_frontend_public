import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/Model/user';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: UserModel = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    image: undefined,
    user_otp: '',
    api_token: '',
    status: '',
    email_verification: undefined,
    hash_number: undefined,
    created_at: '',
    updated_at: '',
    deleted_at: undefined,
  };
  mobile: boolean;
  loading: boolean = false;
  constructor(
    private tokenservice: TokenStorageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.user = this.tokenservice.getUser();
    this.mobile = this.isMobileScreen(window.innerWidth);
  }
  logout() {
    this.router.navigate(['/logout']);
  }
  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 415) {
      return true;
    } else {
      return false;
    }
  }
}
