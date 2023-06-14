import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaContentComponent } from './agenda-content.component';

describe('AgendaContentComponent', () => {
  let component: AgendaContentComponent;
  let fixture: ComponentFixture<AgendaContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
