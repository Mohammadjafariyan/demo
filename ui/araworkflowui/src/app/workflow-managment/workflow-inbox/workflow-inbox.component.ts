import {Component, OnInit} from '@angular/core';
import {PersonnelGrid} from "../personnel/personnel.component";
import {BaseCRUDService} from "../services/base-crud.service";
import {AuthHolder} from "../../auth.guard";
import ProcessDefinitionGrid = namespace.ProcessDefinitionGrid;
import {VacationRequest} from "../vacation-request/vacation-request.component";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-workflow-inbox',
  templateUrl: './workflow-inbox.component.html',
  styleUrls: ['./workflow-inbox.component.css'],
  providers: [BaseCRUDService]
})
export class WorkflowInboxComponent implements OnInit {
  selectedRec;
  list;
  vacation: VacationRequest;
   selectedTask: Task;
   imageToShow: any;

  constructor(private service: BaseCRUDService) {
  }

  displayDialog;

  ngOnInit() {
    this.service.get<ProcessDefinitionGrid>(
      BaseCRUDService.BaseUrl + `runtime/tasks?includeProcessVariables=true&processDefinitionKey=vacationRequest&assignee=` + AuthHolder.username
    ).toPromise().then(res => {
      this.list = res.data;
    });

  }

  preview(){
    this.service.getBlob(BaseCRUDService.BaseUrl +
      `runtime/process-instances/${this.selectedTask.executionId}/diagram`
      ,{ responseType: 'blob' }).toPromise().then(res => {
      //  this.list = res.data;

      const blob = new Blob([res], {type: 'image/png'})

      this.createImageFromBlob(blob);
    });

  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  selected;

  onRowSelect(e: any) {

    this.vacation = new VacationRequest();
    this.vacation.type = e.data.variables.find(s=>s.name=="vacationType").value;
    this.vacation.name = e.data.variables.find(s=>s.name=="title").value;
    this.vacation.days = e.data.variables.find(s=>s.name=="days").value;
    this.selectedTask=e.data;


    this.displayDialog = true;
  }

  actionType = "none";

  accept(e) {
    if(this.actionType=='none'){
      alert('لطفا عملیات مورد نظر خود را انتخاب نمایید');
      return;
    }

    const d = {
      "action":this.actionType,
      "variables": [
        {name:'isApproved',value:'true'}
      ]
    };
    this.service.postG<TaskRoot>(BaseCRUDService.BaseUrl +
      `runtime/tasks/${this.selectedTask.id}`
      , d
    ).toPromise().then(res => {
    //  this.list = res.data;

      this.ngOnInit();

    });

  }

  reject(e) {
    this.displayDialog = false;

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


export interface Variable {
  name: string;
  type: string;
  value: string;
  scope: string;
}

export interface Task {
  id: string;
  url: string;
  owner?: any;
  assignee: string;
  delegationState?: any;
  name: string;
  description?: any;
  createTime: Date;
  dueDate?: any;
  priority: number;
  suspended: boolean;
  taskDefinitionKey: string;
  tenantId: string;
  category?: any;
  formKey?: any;
  parentTaskId?: any;
  parentTaskUrl?: any;
  executionId: string;
  executionUrl: string;
  processInstanceId: string;
  processInstanceUrl: string;
  processDefinitionId: string;
  processDefinitionUrl: string;
  variables: Variable[];
}

export interface TaskRoot {
  data: Task[];
  total: number;
  start: number;
  sort: string;
  order: string;
  size: number;
}
