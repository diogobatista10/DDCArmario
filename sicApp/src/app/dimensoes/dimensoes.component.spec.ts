import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DimensoesComponent } from './dimensoes.component';

describe('DimensoesComponent', () => {
  let component: DimensoesComponent;
  let fixture: ComponentFixture<DimensoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DimensoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DimensoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
