import {Component, OnInit} from '@angular/core';
import {PersonnelGrid} from "../personnel/personnel.component";
import {BaseCRUDService} from "../services/base-crud.service";
import {AuthHolder} from "../../auth.guard";
import ProcessDefinitionGrid = namespace.ProcessDefinitionGrid;

@Component({
  selector: 'app-workflow-inbox',
  templateUrl: './workflow-inbox.component.html',
  styleUrls: ['./workflow-inbox.component.css'],
  providers: [BaseCRUDService]
})
export class WorkflowInboxComponent implements OnInit {
  selectedRec;
  list;

  constructor(private service: BaseCRUDService) {
  }

  displayDialog;

  ngOnInit() {
    this.service.get<ProcessDefinitionGrid>(BaseCRUDService.BaseUrl + 'runtime/tasks?assigneeLike=' + AuthHolder.username + '&active=true&processDefinitionKey=' + 'vactionRequest').toPromise().then(res => {
      this.list = res.data;
    });

  }
  selected;

  onRowSelect(e) {
    this.displayDialog=true;
  }

  accept(e) {
    const d = {
      "action": "complete",
      "variables": []
    };
    this.service.postG<ProcessDefinitionGrid>(BaseCRUDService.BaseUrl +
      `runtime/tasks/${this.selectedRec.id}?involvedUser=` + AuthHolder.username
      , d
    ).toPromise().then(res => {
      this.list = res.data;
    });

  }

  reject(e) {
    alert('پیاده سازی نشده');

  }

}

declare module namespace {

  export interface ProcessDefinition {
    assignee: string;
    createTime: Date;
    delegationState: string;
    description: string;
    dueDate: Date;
    execution: string;
    id: string;
    name: string;
    owner: string;
    parentTask: string;
    priority: number;
    processDefinition: string;
    processInstance: string;
    suspended: boolean;
    taskDefinitionKey: string;
    url: string;
    tenantId?: any;
  }

  export interface ProcessDefinitionGrid {
    data: ProcessDefinition[];
    total: number;
    start: number;
    sort: string;
    order: string;
    size: number;
  }

}

