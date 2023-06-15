import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMessageComponent } from './single-message.component';

describe('SingleMessageComponent', () => {
  let component: SingleMessageComponent;
  let fixture: ComponentFixture<SingleMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleMessageComponent]
    });
    fixture = TestBed.createComponent(SingleMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
