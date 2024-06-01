import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarDesktopComponent } from './nav-bar-desktop.component';

describe('NavBarDesktopComponent', () => {
  let component: NavBarDesktopComponent;
  let fixture: ComponentFixture<NavBarDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarDesktopComponent]
    });
    fixture = TestBed.createComponent(NavBarDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
