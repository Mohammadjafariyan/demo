import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route:Router)
  {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if(AuthHolder.IsLoggedIn)
      return true;
    else{
      this.route.navigate(['/login']);
    }
  }

}


@Injectable({
  providedIn: 'root'
})
export class AuthHolder {
  private static isLoggedIn = false;
  public static username ;

  static get IsLoggedIn() {
    return AuthHolder.isLoggedIn;
  }

  public static login() {
    this.isLoggedIn = true;
  }
  public static logout() {
    this.isLoggedIn = false;
    this.username=null;
  }

}
