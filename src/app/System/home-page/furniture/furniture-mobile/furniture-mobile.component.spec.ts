import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureMobileComponent } from './furniture-mobile.component';

describe('FurnitureMobileComponent', () => {
  let component: FurnitureMobileComponent;
  let fixture: ComponentFixture<FurnitureMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FurnitureMobileComponent]
    });
    fixture = TestBed.createComponent(FurnitureMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
