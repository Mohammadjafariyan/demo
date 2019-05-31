import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCRUDComponent } from './base-crud.component';

describe('BaseCRUDComponent', () => {
  let component: BaseCRUDComponent;
  let fixture: ComponentFixture<BaseCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
