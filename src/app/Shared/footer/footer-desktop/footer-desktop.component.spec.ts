import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDesktopComponent } from './footer-desktop.component';

describe('FooterDesktopComponent', () => {
  let component: FooterDesktopComponent;
  let fixture: ComponentFixture<FooterDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterDesktopComponent]
    });
    fixture = TestBed.createComponent(FooterDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
