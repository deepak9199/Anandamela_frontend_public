import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { logout } from 'src/app/Model/logout';
import { AuthService } from 'src/app/Shared/_services/auth.service';
import { DisplayMessageService } from 'src/app/Shared/_services/display-message.service';
import { SharedService } from 'src/app/Shared/_services/shared.service';
import { TokenStorageService } from 'src/app/Shared/_services/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  constructor(
    private toster: ToastrService,
    private auth: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private displaymessageService:DisplayMessageService
  ) {}

  ngOnInit(): void {
    this.logoutApi();
  }
  //loginAPi
  private logoutApi() {
    this.auth
      .logout()
      .pipe(first())
      .subscribe(
        (data: logout) => {
          if (data.msg == 'Logout Successfully') {
            this.displaymessageService.showSuccess('logout success');
            this.triggerRefresh();
            this.router.navigate(['/']);
          } else {
            this.displaymessageService.showError(data.msg);
          }
        },
        (err) => {
          // this.geterror()
          this.displaymessageService.showSuccess('logout success');
          this.triggerRefresh();
          this.router.navigate(['/']);
          console.log(err.error);
        }
      );
  }
  triggerRefresh() {
    this.sharedService.triggerFunction();
  }
}
