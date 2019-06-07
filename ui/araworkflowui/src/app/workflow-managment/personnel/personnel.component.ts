import {Component, OnInit} from '@angular/core';
import {BaseCRUDService} from "../services/base-crud.service";
import {InputType, MyInput} from "../dynamic-form-generator/dynamic-form-models";

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css'],
  providers: [BaseCRUDService]
})
export class PersonnelComponent implements OnInit {
  data: Personnel[];

  postUrl: string = BaseCRUDService.BaseUrl + 'identity/users';
  putUrl: string = BaseCRUDService.BaseUrl + 'identity/users';
  readUrl: string = BaseCRUDService.BaseUrl + 'identity/users';
  deleteUrl: string = BaseCRUDService.BaseUrl + 'identity/users';
  inputs: MyInput[];

  constructor(private service: BaseCRUDService) {
  }

  ngOnInit() {
     this.service.get<PersonnelGrid>(BaseCRUDService.BaseUrl + '/identity/users').toPromise().then(res => {
       this.data = res.data;
     });
    this.generateForm();

  }


  generateForm() {
    this.inputs = [
      new MyInput(0, 'id', 'نام کاربری', 0, InputType.Text),
      new MyInput(0, 'firstName', 'نام', '', InputType.Text),
      new MyInput(0, 'lastName', 'نام خانوادگی', '', InputType.Text),
      new MyInput(0, 'password', 'رمز عبور', '', InputType.Text),
    ]
  }
}


export interface PersonnelGrid {
  data: Personnel[];
  total: number;
  start: number;
  sort: string;
  order: string;
  size: number;
}

export interface Personnel {
  id: string;
  firstName: null;
  lastName: null;
  url: string;
  email: null;
  pictureURL: null;
}
