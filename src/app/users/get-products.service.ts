import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  isUser: boolean = true
  cartArray : any 
  constructor(private _HttpClient: HttpClient) {

  }
  public length : BehaviorSubject<number>= new BehaviorSubject<number>(0);
  public length2 : BehaviorSubject<number>= new BehaviorSubject<number>(0);

  
  changeLength (value:any): void{
    this.length.next(value)
  }
  changeLength2 (value:any): void{
    this.length2.next(value)
  }
  GetAllProducts () :Observable<any>{
    return this._HttpClient.get('https://fakestoreapi.com/products')
  }
  GetSingleProduct (id:number) :Observable<any>{
    return this._HttpClient.get(`https://fakestoreapi.com/products/${id}`)
  }
  GetAllCatgories () :Observable<any>{
    return this._HttpClient.get(`'https://fakestoreapi.com/products/categories`)
  }
  GetProductsInCatgories (cat:any) :Observable<any>{
    return this._HttpClient.get(`'https://fakestoreapi.com/products/category/${cat}`)
  }
  SendNewCart (mdoal:any):Observable<any>{
    return this._HttpClient.post(`https://fakestoreapi.com/carts`,mdoal)
  }
}

