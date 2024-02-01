import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelErrorComponent } from './label-error.component';

describe('LabelErrorComponent', () => {
  let component: LabelErrorComponent;
  let fixture: ComponentFixture<LabelErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelErrorComponent]
    });
    fixture = TestBed.createComponent(LabelErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
