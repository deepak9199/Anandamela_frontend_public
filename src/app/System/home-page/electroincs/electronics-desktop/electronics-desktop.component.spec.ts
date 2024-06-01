import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicsDesktopComponent } from './electronics-desktop.component';

describe('ElectronicsDesktopComponent', () => {
  let component: ElectronicsDesktopComponent;
  let fixture: ComponentFixture<ElectronicsDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectronicsDesktopComponent]
    });
    fixture = TestBed.createComponent(ElectronicsDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
