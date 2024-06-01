import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryDesktopComponent } from './order-history-desktop.component';

describe('OrderHistoryDesktopComponent', () => {
  let component: OrderHistoryDesktopComponent;
  let fixture: ComponentFixture<OrderHistoryDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryDesktopComponent]
    });
    fixture = TestBed.createComponent(OrderHistoryDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
