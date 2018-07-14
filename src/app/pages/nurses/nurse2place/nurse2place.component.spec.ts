import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nurse2placeComponent } from './nurse2place.component';

describe('Nurse2placeComponent', () => {
  let component: Nurse2placeComponent;
  let fixture: ComponentFixture<Nurse2placeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nurse2placeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nurse2placeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
