import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySectionComponent } from './day-section.component';

describe('DaySectionComponent', () => {
  let component: DaySectionComponent;
  let fixture: ComponentFixture<DaySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaySectionComponent]
    });
    fixture = TestBed.createComponent(DaySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
