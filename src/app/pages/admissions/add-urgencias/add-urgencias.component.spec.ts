import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUrgenciasComponent } from './add-urgencias.component';

describe('AddUrgenciasComponent', () => {
  let component: AddUrgenciasComponent;
  let fixture: ComponentFixture<AddUrgenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUrgenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUrgenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
