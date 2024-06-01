import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseProductPageComponent } from './category-wise-product-page.component';

describe('CategoryWiseProductPageComponent', () => {
  let component: CategoryWiseProductPageComponent;
  let fixture: ComponentFixture<CategoryWiseProductPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryWiseProductPageComponent]
    });
    fixture = TestBed.createComponent(CategoryWiseProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
