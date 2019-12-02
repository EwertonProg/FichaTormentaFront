import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Talento} from "../entity/Talento";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class TalentoService {
  endpoint = environment.apiUrl + '/talento/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Talento[]> {
    return this.http.get<Talento[]>(this.endpoint + 'all').pipe();
  }

  public findById(id: number): Observable<Talento> {
    return this.http.get<Talento>(this.endpoint + id).pipe();
  }

  public save(talento: Talento): Observable<Talento> {
    return this.http.post<Talento>(this.endpoint + 'add', talento, this.httpOptions).pipe();
  }
}
