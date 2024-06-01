import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { optvarification } from 'src/app/Model/otpvarification';
import { registrationApi, signup } from 'src/app/Model/signup';
import { AuthService } from 'src/app/Shared/_services/auth.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { LoginComponent } from '../login/login.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  formsignup: signup = {
    name: '',
    email: '',
    phone: '',
    new_password: '',
    confirm_password: '',
  };
  mobile: boolean;
  constructor(
    private toster: ToastrService,
    private auth: AuthService,
    private token: TokenStorageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRefclose: MatDialogRef<RegistrationComponent>,
    private displaymessageService:DisplayMessageService
  ) {}

  ngOnInit(): void {
    this.mobile = this.isMobileScreen(window.innerWidth);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    this.dialogRefclose.close();
  }
  //login function
  signup() {
    console.log(this.formsignup);
    this.registrationApi(this.formsignup);
  }
  //loginAPi
  registrationApi(userDetails: signup) {
    this.auth
      .register(userDetails)
      .pipe(first())
      .subscribe(
        (data: registrationApi) => {
          if (data.status == 'success') {
            let otp: optvarification = {
              user_otp: '1234',
              user_id: data.data.user.id.toString(),
            };
            console.log(otp);
            this.otpvarificationApi(otp);
          } else {
            this.displaymessageService.showError(data.msg);
            console.log(data);
          }
        },
        (err) => {
          // this.geterror()
          console.log(err.error);
        }
      );
  }
  //otp varication api
  private otpvarificationApi(optvarification: optvarification) {
    this.auth
      .otpvarification(optvarification)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status == 'success') {
            this.displaymessageService.showSuccess('Register successfull');
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
  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 415) {
      return true;
    } else {
      return false;
    }
  }
}
