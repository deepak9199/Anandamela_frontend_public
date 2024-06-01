import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyMobileComponent } from './buy-mobile.component';

describe('BuyMobileComponent', () => {
  let component: BuyMobileComponent;
  let fixture: ComponentFixture<BuyMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyMobileComponent]
    });
    fixture = TestBed.createComponent(BuyMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
