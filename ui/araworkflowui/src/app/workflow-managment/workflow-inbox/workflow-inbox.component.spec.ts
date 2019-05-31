import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowInboxComponent } from './workflow-inbox.component';

describe('WorkflowInboxComponent', () => {
  let component: WorkflowInboxComponent;
  let fixture: ComponentFixture<WorkflowInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
