import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectroincsComponent } from './electroincs.component';

describe('ElectroincsComponent', () => {
  let component: ElectroincsComponent;
  let fixture: ComponentFixture<ElectroincsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectroincsComponent]
    });
    fixture = TestBed.createComponent(ElectroincsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
