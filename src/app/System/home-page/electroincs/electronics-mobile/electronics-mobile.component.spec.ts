import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsMobileComponent } from './electronics-mobile.component';

describe('ElectronicsMobileComponent', () => {
  let component: ElectronicsMobileComponent;
  let fixture: ComponentFixture<ElectronicsMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicsMobileComponent]
    });
    fixture = TestBed.createComponent(ElectronicsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
