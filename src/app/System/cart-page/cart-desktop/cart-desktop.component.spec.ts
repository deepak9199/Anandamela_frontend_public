import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDesktopComponent } from './cart-desktop.component';

describe('CartDesktopComponent', () => {
  let component: CartDesktopComponent;
  let fixture: ComponentFixture<CartDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDesktopComponent]
    });
    fixture = TestBed.createComponent(CartDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
