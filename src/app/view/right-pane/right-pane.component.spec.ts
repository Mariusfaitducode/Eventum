import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightPaneComponent } from './right-pane.component';

describe('RightPaneComponent', () => {
  let component: RightPaneComponent;
  let fixture: ComponentFixture<RightPaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightPaneComponent]
    });
    fixture = TestBed.createComponent(RightPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
