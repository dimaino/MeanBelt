import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltDashboardComponent } from './belt-dashboard.component';

describe('BeltDashboardComponent', () => {
  let component: BeltDashboardComponent;
  let fixture: ComponentFixture<BeltDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeltDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeltDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
