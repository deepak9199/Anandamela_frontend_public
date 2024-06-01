import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureDesktopComponent } from './furniture-desktop.component';

describe('FurnitureDesktopComponent', () => {
  let component: FurnitureDesktopComponent;
  let fixture: ComponentFixture<FurnitureDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FurnitureDesktopComponent]
    });
    fixture = TestBed.createComponent(FurnitureDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
