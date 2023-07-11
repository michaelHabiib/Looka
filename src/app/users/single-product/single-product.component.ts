import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../get-products.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{

  disc:boolean = true
  data:any =[];
  product:any = []
  isLoading:boolean = false
  amount= 1
  cartArray:any= [];
  constructor(public _GetProductsService : GetProductsService, private _ActivatedRoute : ActivatedRoute){

  }
  profileForm = new FormGroup({
    amount: new FormControl('', [Validators.required,Validators.min(1)])
  });
  getErrorMassage(){
    if (this.profileForm.controls.amount.hasError('required')) {
      return 'You must enter a value';
    }else if (this.profileForm.controls.amount.hasError('min')) {
      return "can't Enter Number less Then 1";
    } else{
      return ''
    }
  }
  onSubmit(form:any,pro:any): void{
    if(form.status === 'VALID'){
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

    

  ChangeDiscValue() {
    this.disc = !this.disc
  }
  
  ngOnInit(): void {
    let ProductID = this._ActivatedRoute.snapshot.params['id']
    this.isLoading = true
    this.data = this._GetProductsService.GetSingleProduct(ProductID).subscribe({
      next :(data) =>{
        this.isLoading = false
        console.log(data);
        this.product = data
        console.log(this.product)
      },
      error :(err) =>{
        console.log(err)
      }
    })
  }

  
}
