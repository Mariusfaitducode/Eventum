import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugestFriendComponent } from './sugest-friend.component';

describe('SugestFriendComponent', () => {
  let component: SugestFriendComponent;
  let fixture: ComponentFixture<SugestFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SugestFriendComponent]
    });
    fixture = TestBed.createComponent(SugestFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
