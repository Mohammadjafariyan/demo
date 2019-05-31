import {Component, Input, OnInit, Output} from '@angular/core';
import {InputType, MyInput} from './dynamic-form-models';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export class FormInfo {
  required: any = {};
}

@Component({
  selector: 'app-dynamic-form-generator',
  templateUrl: './dynamic-form-generator.component.html',
  styleUrls: ['./dynamic-form-generator.component.css'],
})
export class DynamicFormGeneratorComponent implements OnInit {

  @Input()
  inputs: MyInput[];
  inputType = InputType;

  @Input()
  formGroup: FormGroup;

  @Input()
  FormInfo: FormInfo;

  constructor() {
  }

  ngOnInit() {



  }

}
