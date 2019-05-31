import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WorkflowManagmentModule} from "./workflow-managment/workflow-managment.module";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: '', redirectTo: '/wm', pathMatch: 'full'},
  {
    path: 'wm',
    canActivate: [AuthGuard],
    loadChildren: './workflow-managment/workflow-managment.module#WorkflowManagmentModule'
  },
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
