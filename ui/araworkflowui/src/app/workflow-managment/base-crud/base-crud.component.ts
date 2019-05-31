import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {InputType, MyInput} from "../dynamic-form-generator/dynamic-form-models";
import {DynamicFormGeneratorComponent, FormInfo} from "../dynamic-form-generator/dynamic-form-generator.component";
import {HttpClient, HttpEvent, HttpEventType} from "@angular/common/http";
import {BaseCRUDService} from "../services/base-crud.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export class ResultViewModel {
  content;
  message;
  messageType: ResultViewModelType;
}

export enum ResultViewModelType {
  Success,
  Fail
}

@Component({
  selector: 'app-base-crud',
  templateUrl: './base-crud.component.html',
  styleUrls: ['./base-crud.component.css'],
  providers: [BaseCRUDService, FormBuilder]
})
export class BaseCRUDComponent implements OnInit {

  @Input()
  isRemote: boolean;

  @Input()
  inputs: MyInput[];
  formInfo: any = new FormInfo();

  @ViewChild('dynaForm')
  dynaForm: DynamicFormGeneratorComponent;


  model: any;

  baseUrl: string = 'http://localhost:8080';

  @Input()
  readUrl: any = this.baseUrl + '';

  @Input()
  deleteUrl: any = this.baseUrl + '';

  @Input()
  putUrl = this.baseUrl + '';

  @Input()
  postUrl = this.baseUrl + '';


  @Input()
  list: any[];
  cols: ({ field: string; header: string })[];
  formGroup: FormGroup;

  ErrorHandler(e) {
    console.error(e.exception);
    console.error(e.message);
    alert('خطایی رخ داد');
    this.displayDialog = false;
  }

  constructor(http: HttpClient,
              protected baseCrudService: BaseCRUDService,
              protected  fb: FormBuilder) {
  }

  ngOnInit() {
    this.generateForm();


    if (this.isRemote)
      this.read();
    this.setCols();
  }
  isPut;
  onsubmit($event) {
    if (this.formGroup.invalid) {
      alert('فرم دارای خطا است');
      return;
    }

    if (this.formGroup.valid) {
      this.model = this.formGroup.value;
      if (this.isPut) {
        this.put().then(res => {
          this.read();
          this.displayDialog = false;
          this.isPut=false;
        });
      } else {
        this.post().then(res => {
          this.read();
          this.displayDialog = false;
          this.isPut=false;
        });
      }
    }
  }

  generateForm() {
    const contolsConfig = {};
    for (let i = 0; i < this.inputs.length; i++) {
      contolsConfig[this.inputs[i].Name] = [this.inputs[i].Value];

      if (this.formInfo.required[this.inputs[i].Name]) {
        contolsConfig[this.inputs[i].Name].push(Validators.required)
      }

    }
    this.formGroup = this.fb.group(contolsConfig);

  }

  read(url?, notset?) {

    console.log(url ? url : this.readUrl)
    return this.baseCrudService.read(url ? url : this.readUrl).toPromise()
      .then((res: any) => {


        this.list=res.data;
        return res;

        /*   if (res.messageType == ResultViewModelType.Success) {

             if (!notset)
               this.list = res.content;
             return this.list;

           } else {
             alert(res.message);
           }*/
      }).catch(this.ErrorHandler)

  }

  put(url?, notset?) {

    return this.baseCrudService.put(url ? url : this.putUrl, this.model.id, this.model).toPromise()
      .then((res: ResultViewModel) => {

        return res;
        /*   if (res.messageType == ResultViewModelType.Success) {

               if (!notset)
                 this.model = res.content;
               return this.model;

             } else {
               alert(res.message);
             }*/
      }).catch(this.ErrorHandler)

  }

  post(url?, notset?) {
    return this.baseCrudService.post(url ? url : this.postUrl, this.model).toPromise()
      .then((res: ResultViewModel) => {

        return res;
       /* if (res.messageType == ResultViewModelType.Success) {

          if (!notset)
            this.model.id = res.content;
          return res.content;

        } else {
          alert(res.message);
        }*/
      }).catch(this.ErrorHandler)
  }

  setCols() {
    this.cols = [];
    for (let i = 0; i < this.inputs.length; i++) {
      this.cols.push(
        {field: this.inputs[i].Name, header: this.inputs[i].FarsiName}
      )
    }
  }


  onRowSelect(event) {
    this.isPut=true;

    this.model = this.cloneCar(event.data);
    this.formGroup.patchValue(this.model);
    this.displayDialog = true;
  }

  cloneCar(c: any): any {
    let car = {};
    for (let prop in c) {
     // car[prop.charAt(0).toUpperCase() + prop.slice(1)] = c[prop];
      car[prop] = c[prop];
    }
    return car;
  }


  showDialogToAdd() {
    this.isPut=false;
    this.model = {};
    this.formGroup.reset();
    this.formGroup.patchValue({Id: 0});
    this.displayDialog = true;
  }


  displayDialog: any;
  selectedRec: any;

  @Input()
  caption: any;


  delete(url) {
    return this.baseCrudService.delete(url ? url : this.deleteUrl, this.model.id).toPromise()
      .then((res: HttpEvent<ResultViewModel>) => {

        this.read();
        return res;
        /*     if (res.type == HttpEventType.Response) {
                if (res.body.messageType == ResultViewModelType.Success) {

                  // this.model = res.body.content;
                  this.displayDialog = false;
                  return res.body.content;

                } else {
                  alert(res.body.message);
                }
              }*/


      }).catch(this.ErrorHandler)
  }
}
