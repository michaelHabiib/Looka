import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(public _HttpClient :HttpClient ) { }

  GetAllCarts():Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/carts`)
  }
  DeleteCart(id: number):Observable<any>{
    return this._HttpClient.delete(`https://dummyjson.com/carts/${id}`)
  }
  GetSingleCart (id:number) :Observable<any>{
    return this._HttpClient.get(`https://dummyjson.com/carts/${id}`)
  }
  GetSingleProduct (id:number) :Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/${id}`)
  }
  GetAllProducts () :Observable<any>{
    return this._HttpClient.get('https://fakestoreapi.com/products')
  }
  AddNewProduct(body: any):Observable<any> {
    return this._HttpClient.post(`https://fakestoreapi.com/products`,body)
  }
}
