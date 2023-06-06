import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerEventComponent } from './container-event.component';

describe('ContainerEventComponent', () => {
  let component: ContainerEventComponent;
  let fixture: ComponentFixture<ContainerEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerEventComponent]
    });
    fixture = TestBed.createComponent(ContainerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
