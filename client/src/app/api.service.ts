import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order';
import { Item } from './item';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = "http://localhost:8080/";

  constructor(private http : HttpClient) { }

  login(credentials) : Observable<any>{
    return this.http.post<any>(this.baseURL + 'login', credentials);
  }

  register(credentials) : Observable<any>{
    return this.http.post<any>(this.baseURL + 'register', credentials);
  }

  getOrders() : Observable<any>{
    return this.http.get<Order[]>(this.baseURL +'order');
  }
  
  createOrder(credentials) : Observable<any>{
    return this.http.post<Order>(this.baseURL +'order', credentials);
  }
  
  getItemsByOrderName(credentials) : Observable<any>{
    return this.http.post<Item[]>(this.baseURL +'item/order', credentials);
  }
  
  getItemsNoStorage() : Observable<any>{
    return this.http.get<Item[]>(this.baseURL +'item/nostorage');
  }
  
  enterItem(credentials) : Observable<any>{
    return this.http.post<Item>(this.baseURL +'item', credentials);
  }
  
  removeItem(credentials) : Observable<any>{
    return this.http.post<Item>(this.baseURL +'item/remove', credentials);
  }

  createUnit(credentials) : Observable<any>{
    return this.http.post<Item>(this.baseURL +'storageunit', credentials);
  }
  
  getStorageUnits() : Observable<any> {
    return this.http.get<any>(this.baseURL + 'storageunit');
  }

  setStorageUnit(credentials) : Observable<any> {
    return this.http.post<Item>(this.baseURL + 'item/unit', credentials);
  }

  getItemsByUnit(credentials) : Observable<any> {
    return this.http.post<Item>(this.baseURL + 'item/unitname', credentials);
  }

  getAllStorageUnits() : Observable<any> {
    return this.http.get<any>(this.baseURL + 'storageunit/unitonly');
  }

  getItemsByName(credentials) : Observable<any> {
    return this.http.post<Item>(this.baseURL + 'item/itemname', credentials);
  }
}
