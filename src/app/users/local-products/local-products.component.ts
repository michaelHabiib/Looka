import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-local-products',
  templateUrl: './local-products.component.html',
  styleUrls: ['./local-products.component.css']
})
export class LocalProductsComponent implements OnInit {
  constructor(private _GetProductsService: GetProductsService){}


  @Input()localArray:any  = {}
  @Input() index:number = 0
  cartView:boolean = true
  amount:number = 1;
  cartArray: any;
  profileForm = new FormGroup({
    amount: new FormControl('', [Validators.required,Validators.min(1), Validators.pattern('')])
  });

  getErrorMassage(){
    if (this.profileForm.controls.amount.hasError('required')) {
      return 'You must enter a value';
    }else if (this.profileForm.controls.amount.hasError('min')) {
      return "can't Enter Number less Then 1";
    }else if (this.profileForm.controls.amount.hasError('pattern')) {
      return "decimal Number are not allowed";
    }else{
      return ''
    }
  }


DecreaseAmount(){
    this.amount--
}
increaseAmount(){
  if(this.amount === 10){
    return "Can't order More Than 10 Piece";
  }else{
    this.amount++
    return'';
  }
}

  addToCart(form: any,product: any):void{
      if("cart2" in localStorage){
        this.cartArray = JSON.parse(localStorage.getItem("cart2")!)
          this.cartArray.push({item :product , amount : this.amount})
          localStorage.setItem("cart2", JSON.stringify(this.cartArray))
          this._GetProductsService.changeLength2(this.cartArray.length)
          Swal.fire(`(${this.amount} ${product.title}) added to Your Cart`)
      }
      // else{
      //   this.cartArray.push(product)
      //   localStorage.setItem("cart2", JSON.stringify(this.cartArray))
      // }
  }
  ngOnInit(): void {
  localStorage.setItem("cart2", JSON.stringify([]))
  }
}
