import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetProductsService } from '../get-products.service';

@Component({
  selector: 'app-imp-product',
  templateUrl: './imp-product.component.html',
  styleUrls: ['./imp-product.component.css']
})
export class ImpProductComponent {
@Input() product:any  = {}
cartView:boolean = true
cartArray:any= [];
amount:number = 1;
constructor(private _GetProductsService : GetProductsService) {
}
profileForm = new FormGroup({
  amount: new FormControl('', [Validators.required,Validators.min(1),Validators.pattern('')])
});

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

getErrorMassage(){
  if (this.profileForm.controls.amount.hasError('required')) {
    return 'You must enter a value';
  }else if (this.profileForm.controls.amount.hasError('min')) {
    return "can't Enter Number less Then 1";
  }else if(this.profileForm.controls.amount.hasError('pattern')){
    return 'decimal Numbers are not allowed'
  } else{
    return ''
  }
}

onSubmit(form:any,pro:any): void{
    if("cart" in localStorage){
      this.cartArray = JSON.parse(localStorage.getItem("cart")!)
      let exessitArray = this.cartArray.find((item: { item: { id: any; }; }) => item.item.id == pro.id)
      if( this.amount <= 0){
        Swal.fire('You Can\'t Enter Number less Than 1')
      }else if(exessitArray){
        Swal.fire(`(${exessitArray.item.title}) is already in Your Cart <br> You Can Modify The amount From Your Cart `)
      } else{
        this.cartArray.push({item :pro , amount : this.amount})
        this._GetProductsService.changeLength(this.cartArray.length)
        localStorage.setItem("cart", JSON.stringify(this.cartArray))
        Swal.fire(`(${this.amount} ${pro.title}) added to Your Cart`)
        
      }
    }else{
      if( this.amount <= 0){
        Swal.fire('You Can\'t Enter Number less Than 1')
      }else{
        this.cartArray.push({item :pro , amount : this.amount})
        this._GetProductsService.changeLength(this.cartArray.length)
        localStorage.setItem("cart", JSON.stringify(this.cartArray))
        Swal.fire(`(${this.amount} ${pro.title}) added to Your Cart`)
        
      }
    }
    this.profileForm.reset()
  
}
}
