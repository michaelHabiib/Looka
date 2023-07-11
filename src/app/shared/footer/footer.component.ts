import { Component } from '@angular/core';
import { GetProductsService } from 'src/app/users/get-products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private _GetProductsService: GetProductsService,) {}
  switchAuth2(){
    this._GetProductsService.isUser = true
  }
  switchAuth() {
    this._GetProductsService.isUser = false
  }

  GetProductsInCategory(cat: any){
    this._GetProductsService.GetProductsInCatgories(cat).subscribe({
      next: (res)=> {
        console.log(res);
      }
    })
  }
}
