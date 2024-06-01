import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ApiloginData, login } from 'src/app/Model/login';
import { AuthService } from 'src/app/Shared/_services/auth.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { RegistrationComponent } from '../registration/registration.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formlogin: login = {
    username: '',
    password: '',
  };
  mobile: boolean;
  constructor(
    private toster: ToastrService,
    private auth: AuthService,
    private token: TokenStorageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRefclose: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
    private sharedService: SharedService,
    private displaymessageService:DisplayMessageService
  ) {}

  ngOnInit(): void {
    this.mobile = this.isMobileScreen(window.innerWidth);
    console.log(this.mobile);
    this.status();
  }
  //check login status
  private status() {
    if (this.ValidatorChecker(this.token.getToken())) {
      this.router.navigate(['/']);
    }
  }
  //login function
  login() {
    this.loginApi(this.formlogin);
  }
  //loginAPi
  loginApi(credentials: login) {
    this.auth
      .login(credentials)
      .pipe(first())
      .subscribe(
        (data: ApiloginData) => {
          if (data.msg == 'Login Successfull') {
            this.token.saveUser(data.data.user_details);
            this.displaymessageService.showSuccess('login success');
            // this.router.navigate(['/']);
            this.triggerRefresh();
            this.dialogRefclose.close();
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          console.log(err.error);
        }
      );
  }
  //validator for undefine empty null data 0
  private ValidatorChecker(data: any) {
    if (
      typeof data === 'undefined' ||
      data === null ||
      data.toString() === '' ||
      data.toString() === '0' ||
      Number.isNaN(data)
    ) {
      return false;
    } else {
      return true;
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationComponent);
    this.dialogRefclose.close();
  }
  openDialogforget() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent);
    this.dialogRefclose.close();
  }
  triggerRefresh() {
    this.sharedService.triggerFunction();
  }

  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 415) {
      return true;
    } else {
      return false;
    }
  }
}
