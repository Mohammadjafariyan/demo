import { Component, OnInit } from '@angular/core';
import {AuthHolder} from "../../auth.guard";
import {BaseCRUDService} from "../services/base-crud.service";
import {Variable} from "../workflow-inbox/workflow-inbox.component";

@Component({
  selector: 'app-my-in-flow-requests',
  templateUrl: './my-in-flow-requests.component.html',
  styleUrls: ['./my-in-flow-requests.component.css'],
  providers: [BaseCRUDService]

})
export class MyInFlowRequestsComponent implements OnInit {
   list: Historic[];

  constructor(private service: BaseCRUDService) {
  }

  displayDialog;

  ngOnInit() {
    this.service.get<HistoricRoot>(
      BaseCRUDService.BaseUrl + `history/historic-process-instances?includeProcessVariables=true&startedBy=` + AuthHolder.username
    ).toPromise().then(res => {
      this.list = res.data;
    });
  }
}




export interface Historic {
  id: string;
  businessKey: string;
  processDefinitionId: string;
  processDefinitionUrl: string;
  startTime: Date;
  endTime: Date;
  durationInMillis: number;
  startUserId: string;
  startActivityId: string;
  endActivityId: string;
  deleteReason?: any;
  superProcessInstanceId: string;
  url: string;
  variables: Variable[];
  tenantId?: any;
}

export interface HistoricRoot {
  data: Historic[];
  total: number;
  start: number;
  sort: string;
  order: string;
  size: number;
}
