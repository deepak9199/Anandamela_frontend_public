import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryMobileComponent } from './order-history-mobile.component';

describe('OrderHistoryMobileComponent', () => {
  let component: OrderHistoryMobileComponent;
  let fixture: ComponentFixture<OrderHistoryMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderHistoryMobileComponent]
    });
    fixture = TestBed.createComponent(OrderHistoryMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
