import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeIndicationsComponent } from './see-indications.component';

describe('SeeIndicationsComponent', () => {
  let component: SeeIndicationsComponent;
  let fixture: ComponentFixture<SeeIndicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeIndicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeIndicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
