import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  login(credentials) : Observable<any>{
    return this.http.post<any>('http://localhost:8080/login', credentials);
  }

  register(credentials) : Observable<any>{
    return this.http.post<any>('http://localhost:8080/register', credentials);
  }
}
