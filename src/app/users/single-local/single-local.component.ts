import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { GetProductsService } from '../get-products.service';


@Component({
  selector: 'app-single-local',
  templateUrl: './single-local.component.html',
  styleUrls: ['./single-local.component.css']
})
export class SingleLocalComponent implements OnInit {
  
  products:[] =[]
  product:any = {}
  isLoading:boolean = false
  amount= 1
  disc:boolean = true
  cartArray: any;
  constructor(private _ActivatedRoute : ActivatedRoute, private _GetProductsService : GetProductsService){

  }
  profileForm = new FormGroup({
    amount: new FormControl('', [Validators.required,Validators.min(1),Validators.max(10)])
  });

  GetLocal(){
    this.products = JSON.parse(localStorage.getItem("OurProducts")!)
    let index = this._ActivatedRoute.snapshot.params['index']
    this.product =this.products[index]
    console.log(this.products);
    console.log(index);
    
  }

  ChangeDiscValue() {
    this.disc = !this.disc
  }

  getErrorMassage(){
    if (this.profileForm.controls.amount.hasError('required')) {
      return 'You must enter a value';
    }else if (this.profileForm.controls.amount.hasError('min')) {
      return "can't Enter Number less Then 1";
    }else if (this.profileForm.controls.amount.hasError('max')) {
      return "can't order More than 10 Piece";
    } else{
      return ''
    }
  }

  addToCart(form: any,product: any):void{

    if(form.status === 'VALID'){
      if("cart2" in localStorage){
        this.cartArray = JSON.parse(localStorage.getItem("cart2")!)
          this.cartArray.push({item :product , amount : this.amount})
          localStorage.setItem("cart2", JSON.stringify(this.cartArray))
          this._GetProductsService.changeLength2(this.cartArray.length)
          Swal.fire(`(${this.amount} ${product.title}) added to Your Cart`)
      }else{
        this.cartArray.push(product)
        localStorage.setItem("cart2", JSON.stringify(this.cartArray))
      }
    }
  }




  ngOnInit(): void {
    if(!("cart2" in localStorage))
    localStorage.setItem("cart2", JSON.stringify([]))
    this.GetLocal()
  }
}
