import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkflowsComponent} from "./workflows/workflows.component";
import {WorkflowInboxComponent} from "./workflow-inbox/workflow-inbox.component";
import {VacationRequestComponent} from "./vacation-request/vacation-request.component";
import {PersonnelComponent} from "./personnel/personnel.component";
import {AuthGuard} from "../auth.guard";

const routes: Routes = [
  {
    path: 'workflows',
    canActivate: [AuthGuard],
    component: WorkflowsComponent
  },
  {
    path: 'vacation',
    canActivate: [AuthGuard], component: VacationRequestComponent
  },
  {path: 'personnel', canActivate: [AuthGuard], component: PersonnelComponent},
  {path: 'inbox', canActivate: [AuthGuard], component: WorkflowInboxComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkflowManagmentRoutingModule {
}
