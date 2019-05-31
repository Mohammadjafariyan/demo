import {Component} from '@angular/core';
import {AuthHolder} from "./auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'araworkflowui';
  AuthHolder = AuthHolder;

  constructor(private router:Router){

  }

  logout() {
    AuthHolder.logout();
    this.router.navigate(['/login']);
  }
}
