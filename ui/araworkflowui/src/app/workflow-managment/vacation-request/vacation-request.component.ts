import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthHolder} from "../../auth.guard";
import {BaseCRUDService} from "../services/base-crud.service";
import {Router} from "@angular/router";


export class StartProcessRequestVariable {
  name: string;
  value: string;
}

export class StartProcessRequest {
  processDefinitionId: string;
  businessKey: string;
  processDefinitionKey;
  variables: StartProcessRequestVariable[];
}


export class StartProcessResponseVariable {
  name: string;
  value: string;
}

export class StartProcessResponse {
  processDefinitionKey: string;
  businessKey: string;
  tenantId: string;
  variables: StartProcessResponseVariable[];
}


@Component({
  selector: 'app-vacation-request',
  templateUrl: './vacation-request.component.html',
  styleUrls: ['./vacation-request.component.css']
})
export class VacationRequestComponent implements OnInit {


  @Input()
  disabled;
  @Input()
  model: VacationRequest;
  //formModel: DynamicFormModel = MY_FORM_MODEL;
  formGroup: FormGroup;
  upperLevel: any;


  constructor(private service: BaseCRUDService,
              private router: Router) {
  }

  ngOnInit() {

    if (!this.model) {
      this.model = new VacationRequest()
    }

    this.service.get<string>
    (`http://re92p16o446r2t.aminrayaneh.ir/ticket/personel.php?username=${AuthHolder.username}`).toPromise().then(res => {
      this.upperLevel = res['username'];
    });

  }

  onSubmit() {

    const m = new StartProcessRequest();
    m.processDefinitionKey = 'vacationRequest';

    m.variables = [{
      name: 'vacationType', value: this.model.type

    }, {
      name: 'days', value: this.model.days
    }
      ,
      {
        name: 'title', value: this.model.name
      },
      {
        name: 'upper', value: this.upperLevel
      }
    ];

    this.service.postG<StartProcessResponse>
    (BaseCRUDService.BaseUrl + 'runtime/process-instances', m).toPromise().then(res => {
      this.router.navigate(['/wm/inbox']);
    });


  }
}

export class VacationRequest {
  type;
  name;
  date: Date;
  days;
}


/*
export const MY_FORM_MODEL: DynamicFormModel = [

  new DynamicFormGroupModel({

    id: "fullName",
    legend: "Name",
    group: [
      new DynamicInputModel({

        id: "firstName",
        label: "عنوان"
      }),
      new DynamicSelectModel({
        id: "type",
        label: "نوع مرخصی" ,
        options: [
          {
            label: "استعلاجی",
            value: "1"
          },
          {
            label: "استحقاقی",
            value: "2"
          },
          {
            label: "بدون حقوق",
            value: "3"
          }
        ],
      }),

      new DynamicDatePickerModel({

        id: "departureDate",
        inline: false,
        label: "تاریخ",
        placeholder: "از تاریخ",
      }) ,
      new DynamicInputModel({

        id: "roomQuantity",
        inputType: "number",
        label: "تعداد روز",
        placeholder: "تعداد روز",
        hint: "حداکثر: 5",
        max: 5,
        min: 1,
        value: 1
      })
    ]
  })
];
*/
