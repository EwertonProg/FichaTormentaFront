import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {Origem} from "../entity/Origem";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class OrigemService {
  endpoint = environment.apiUrl + '/origem/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getAll(): Observable<Origem[]> {
    return this.http.get<Origem[]>(this.endpoint + 'all').pipe()
  }

  public findById(id: number): Observable<Origem> {
    return this.http.get<Origem>(this.endpoint + id).pipe()
  }

  public save(origem: Origem) {
    this.http.post<Origem>(this.endpoint, origem);
  }
}
