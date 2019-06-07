import { Component, OnInit } from '@angular/core';
import {AuthHolder} from "../../auth.guard";
import {Historic, HistoricRoot} from "../my-in-flow-requests/my-in-flow-requests.component";
import {BaseCRUDService} from "../services/base-crud.service";

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements OnInit {
  list: Historic[];

  constructor(private service: BaseCRUDService) {
  }

  displayDialog;

  ngOnInit() {
    this.service.get<HistoricRoot>(
      BaseCRUDService.BaseUrl + `history/historic-process-instances?includeProcessVariables=true&involvedUser=` + AuthHolder.username
    ).toPromise().then(res => {
      this.list = res.data;
    });
  }
}
