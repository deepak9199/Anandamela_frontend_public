import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDesktopComponent } from './product-desktop.component';

describe('ProductDesktopComponent', () => {
  let component: ProductDesktopComponent;
  let fixture: ComponentFixture<ProductDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDesktopComponent]
    });
    fixture = TestBed.createComponent(ProductDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
