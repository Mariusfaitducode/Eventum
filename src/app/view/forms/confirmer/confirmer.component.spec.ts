import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerComponent } from './confirmer.component';

describe('ConfirmerComponent', () => {
  let component: ConfirmerComponent;
  let fixture: ComponentFixture<ConfirmerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmerComponent]
    });
    fixture = TestBed.createComponent(ConfirmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
