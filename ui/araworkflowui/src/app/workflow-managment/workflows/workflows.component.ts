import {Component, OnInit} from '@angular/core';
import {InputType, MyInput} from "../dynamic-form-generator/dynamic-form-models";
import ProcessDefinition = namespace.ProcessDefinition;
import {HttpClient} from "@angular/common/http";
import {BaseCRUDService} from "../services/base-crud.service";

@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css'],
  providers:[BaseCRUDService]
})
export class WorkflowsComponent implements OnInit {

  postUrl: string;
  putUrl: string;
  readUrl: string = BaseCRUDService.BaseUrl + '/repository/process-definitions';
  deleteUrl: string;
   inputs: MyInput[];
   data: namespace.Datum[];


  constructor(private service: BaseCRUDService) {
  }
  ngOnInit() {
      this.service.get<ProcessDefinition>(BaseCRUDService.BaseUrl + '/repository/process-definitions').toPromise().then(res => {
        this.data = res.data;
      });

  }


  generateForm() {
    this.inputs = [
      new MyInput(0, 'id', 'id', 0, InputType.Hidden),
      new MyInput(0, 'key', 'key', '', InputType.Text),
      new MyInput(0, 'name', 'name', '', InputType.Text),
      new MyInput(0, 'description', 'description', '', InputType.Text),
    ]
  }

}
