import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltAddComponent } from './belt-add.component';

describe('BeltAddComponent', () => {
  let component: BeltAddComponent;
  let fixture: ComponentFixture<BeltAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeltAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeltAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
