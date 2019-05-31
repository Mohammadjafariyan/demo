import {Component, OnInit} from '@angular/core';
import {AuthGuard, AuthHolder} from "../auth.guard";
import {Router} from "@angular/router";
import {BaseCRUDService} from "../workflow-managment/services/base-crud.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BaseCRUDService]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: BaseCRUDService) {
  }

  error() {
    alert('نام کاربری اشتباه است');
  }


  username;

  ngOnInit() {
  }

  login() {
    this.service.get<any>(BaseCRUDService.BaseUrl + 'identity/users/' + this.username).toPromise().then(res => {
      AuthHolder.username = this.username;
      AuthHolder.login();
      this.router.navigate(['/']);

    }).catch(this.error);


  }
}
