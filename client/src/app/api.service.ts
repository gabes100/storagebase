import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  login(credentials) : Observable<User>{
    return this.http.post<User>('http://localhost:8080/login', credentials);
  }

  register(credentials) : Observable<User>{
    return this.http.post<User>('http://localhost:8080/register', credentials);
  }
}
