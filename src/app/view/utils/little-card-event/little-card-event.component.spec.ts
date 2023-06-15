import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LittleCardEventComponent } from './little-card-event.component';

describe('LittleCardEventComponent', () => {
  let component: LittleCardEventComponent;
  let fixture: ComponentFixture<LittleCardEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LittleCardEventComponent]
    });
    fixture = TestBed.createComponent(LittleCardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
