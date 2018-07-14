import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DietAndMedicamentsComponent } from './diet-and-medicaments.component';

describe('DietAndMedicamentsComponent', () => {
  let component: DietAndMedicamentsComponent;
  let fixture: ComponentFixture<DietAndMedicamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DietAndMedicamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DietAndMedicamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
