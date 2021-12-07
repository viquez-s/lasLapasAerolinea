import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


const ENDPOINT = `${environment.apiUrl}/user`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  get(): Observable<any> {
    return this.http.get(ENDPOINT, httpOptions);
  }

  create(post: any): Observable<any> {
    return this.http.post(`${ENDPOINT}/signup`, post);
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
