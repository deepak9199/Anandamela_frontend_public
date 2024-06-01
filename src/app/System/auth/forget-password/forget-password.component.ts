import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { ApiloginData } from 'src/app/Model/login';
import { optvarification } from 'src/app/Model/otpvarification';
import { resetpassword } from 'src/app/Model/resetpassword';
import { signup } from 'src/app/Model/signup';
import { AuthService } from 'src/app/Shared/_services/auth.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';
import { LoginComponent } from '../login/login.component';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  formresetpass: resetpassword = {
    user_otp: '',
    user_id: 0,
    new_password: '',
    confirm_password: '',
    email: '',
  };
  isSendEmail: boolean = false;
  mobile: boolean;
  constructor(
    private toster: ToastrService,
    private auth: AuthService,
    private token: TokenStorageService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRefclose: MatDialogRef<ForgetPasswordComponent>,
    public dialog: MatDialog,
    private displaymessageService:DisplayMessageService
  ) {}

  ngOnInit(): void {
    this.mobile = this.isMobileScreen(window.innerWidth);
    this.isSendEmail = false;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent);
    this.dialogRefclose.close();
  }
  sendEmial() {
    this.forgetpassApi(this.formresetpass.email);
  }
  changepass() {
    this.resetpassApi(this.formresetpass);
  }
  private isMobileScreen(width: number): boolean {
    if (window.innerWidth <= 415) {
      return true;
    } else {
      return false;
    }
  }
  //forget api
  forgetpassApi(email: string) {
    this.auth
      .forgetpassword(email)
      .pipe(first())
      .subscribe({
        next: (data) => {
          if (data.status == 'success') {
            this.isSendEmail = true;
            this.displaymessageService.showSuccess('success');
            this.formresetpass.user_id = data.data.user.id;
          } else {
            this.displaymessageService.showError(data.msg);
            console.log(data);
          }
        },
        error: (err) => {
          // this.geterror()
          console.log(err.error);
        },
      });
  }
  //reset api
  resetpassApi(resetpass: resetpassword) {
    this.auth
      .resetpassword(resetpass)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status == 'success') {
            this.displaymessageService.showSuccess('Password Changed Successfully');
            // this.otpvarificationApi(otp)
            this.dialogRefclose.close();
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
}
