import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentralPaneComponent } from './central-pane.component';

describe('CentralPaneComponent', () => {
  let component: CentralPaneComponent;
  let fixture: ComponentFixture<CentralPaneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CentralPaneComponent]
    });
    fixture = TestBed.createComponent(CentralPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
