import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsUrgenciasComponent } from './patients-urgencias.component';

describe('PatientsUrgenciasComponent', () => {
  let component: PatientsUrgenciasComponent;
  let fixture: ComponentFixture<PatientsUrgenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsUrgenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsUrgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
