import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyDesktopComponent } from './buy-desktop.component';

describe('BuyDesktopComponent', () => {
  let component: BuyDesktopComponent;
  let fixture: ComponentFixture<BuyDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyDesktopComponent]
    });
    fixture = TestBed.createComponent(BuyDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
