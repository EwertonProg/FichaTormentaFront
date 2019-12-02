import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Injectable} from "@angular/core";
import {GrupoTalento} from "../entity/GrupoTalento";

@Injectable({providedIn:'root'})
export class GrupoTalentoService {
  endpoint = 'http://192.168.0.102:8080/grupoTalento/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getAll():Observable<GrupoTalento[]>{
    return this.http.get<GrupoTalento[]>(this.endpoint+'all').pipe()
  }

  public findById(id:number):Observable<GrupoTalento>{
    return this.http.get<GrupoTalento>(this.endpoint+id).pipe()
  }

  public save(grupoTalento:GrupoTalento){
    this.http.post<GrupoTalento>(this.endpoint, grupoTalento);
  }
}
