import { DisplayMessageService } from './../_services/display-message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css'],
})
export class DisplayMessageComponent {
  toast = { message: '', type: '' };
  isVisible = false;

  constructor(private messageService: DisplayMessageService) {}
  ngOnInit() {
    this.messageService.getMessage().subscribe((toast) => {
      this.toast = toast;
      this.isVisible = true;

      setTimeout(() => {
        this.isVisible = false;
      }, 1000);
    });
  }
}
