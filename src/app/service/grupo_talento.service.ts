import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {GrupoTalento} from "../entity/GrupoTalento";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class GrupoTalentoService {
  endpoint = environment.apiUrl + '/grupoTalento/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<GrupoTalento[]> {
    return this.http.get<GrupoTalento[]>(this.endpoint + 'all').pipe()
  }

  public findById(id: number): Observable<GrupoTalento> {
    return this.http.get<GrupoTalento>(this.endpoint + id).pipe()
  }

  public save(grupoTalento: GrupoTalento) {
    this.http.post<GrupoTalento>(this.endpoint, grupoTalento);
  }
}
