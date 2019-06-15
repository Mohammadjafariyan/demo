import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResultViewModel} from "../base-crud/base-crud.component";
import {AuthHolder} from "../../auth.guard";

@Injectable({
  providedIn: 'root'
})
export class BaseCRUDService {

  public static BaseUrl=AuthHolder.username ?
    `http://${AuthHolder.username}:${AuthHolder.username}@localhost:8090/` : 'http://localhost:8090/';

  constructor(protected http: HttpClient) {
  }

  read(readUrl: string): Observable<ResultViewModel> {
    return this.http.get<ResultViewModel>(readUrl);
  }

  put(readUrl: any, Id, model: any): Observable<ResultViewModel> {
    return this.http.put<ResultViewModel>(readUrl + `/${Id}`, model);
  }

  post(readUrl: any, model: any): Observable<ResultViewModel> {
    return this.http.post<ResultViewModel>(readUrl, model);
  }

  delete(deleteUrl: any, Id: any): Observable<HttpEvent<ResultViewModel>> {
    return this.http.delete<ResultViewModel>(deleteUrl + `/${Id}`,Id);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  getBlob(url: string,param:any): Observable<ArrayBuffer> {
    return this.http.get(url,param);
  }

  postG<T>(readUrl: any, model: any): Observable<T> {
    return this.http.post<T>(readUrl, model);
  }

}
