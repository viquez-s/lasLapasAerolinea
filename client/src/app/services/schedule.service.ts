import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

const ENDPOINT = `${environment.apiUrl}/schedule`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(ENDPOINT, httpOptions);
  }
  create(post: any): Observable<any> {
    return this.http.post(ENDPOINT, post);
  }
  delete(id: string): Observable<any> {
    return this.http.delete(`${ENDPOINT}/${id}`);
  }

  edit(id: string, post: any): Observable<any> {
    return this.http.put(`${ENDPOINT}/${id}`, post);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${ENDPOINT}/${id}`);
  }
}
