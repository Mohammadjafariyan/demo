import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkflowManagmentRoutingModule} from './workflow-managment-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {WorkflowsComponent} from './workflows/workflows.component';
import {BaseCRUDComponent} from "./base-crud/base-crud.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {VacationRequestComponent} from './vacation-request/vacation-request.component';
import {WorkflowInboxComponent} from './workflow-inbox/workflow-inbox.component';
import {PersonnelComponent} from './personnel/personnel.component';
import {BaseCRUDService} from "./services/base-crud.service";
import {GroupComponent} from './group/group.component';
import {DynamicFormGeneratorComponent} from "./dynamic-form-generator/dynamic-form-generator.component";

@NgModule({
  declarations: [LayoutComponent, WorkflowsComponent
    , BaseCRUDComponent, VacationRequestComponent,
    WorkflowInboxComponent, PersonnelComponent, GroupComponent,
    DynamicFormGeneratorComponent, BaseCRUDComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ButtonModule,
    WorkflowManagmentRoutingModule,
  ],
  providers: [BaseCRUDService]
})
export class WorkflowManagmentModule {
}
