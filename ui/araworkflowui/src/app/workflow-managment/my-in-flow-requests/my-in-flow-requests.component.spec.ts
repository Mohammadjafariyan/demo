import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyInFlowRequestsComponent } from './my-in-flow-requests.component';

describe('MyInFlowRequestsComponent', () => {
  let component: MyInFlowRequestsComponent;
  let fixture: ComponentFixture<MyInFlowRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyInFlowRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyInFlowRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
