import { Component } from '@angular/core';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public _GetProductsService: GetProductsService){}
  switchAuth() {
    this._GetProductsService.isUser = false
  }
  switchAuth2(){
    this._GetProductsService.isUser = true
  }
}
