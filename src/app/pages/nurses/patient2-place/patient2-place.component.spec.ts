import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Patient2PlaceComponent } from './patient2-place.component';

describe('Patient2PlaceComponent', () => {
  let component: Patient2PlaceComponent;
  let fixture: ComponentFixture<Patient2PlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Patient2PlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Patient2PlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
