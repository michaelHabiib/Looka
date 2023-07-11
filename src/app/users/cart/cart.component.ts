import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GetProductsService } from '../get-products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartArray:any[] =[]
  localCart:any = []
  total:number = 0;
  indexing:number = 1;
  cartRow:any [] = []
  constructor(public _GetProductsService : GetProductsService) {

  }

  // get cart from localStorage
  GetCart() {
    if("cart" in localStorage){
      this.cartArray = JSON.parse(localStorage.getItem("cart")!)
    }
    if("cart2" in localStorage){
      this.localCart = JSON.parse(localStorage.getItem("cart2")!)
    }
    this.GetCartTotal()
  }
  // Get total amount of Cart
  GetCartTotal() {
    this.total = 0;
    for(let x in this.cartArray) {
        this.total = this.total + (this.cartArray[x].item.price * this.cartArray[x].amount)
    }
    for(let y in this.localCart) {
        this.total = this.total + (this.localCart[y].item.price * this.localCart[y].amount)
    }
    // console.log(this.total);
    return this.total
  }
  // increase amount
  IncreaseAmount(index:number) {
    this.cartArray[index].amount++
    this.GetCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartArray))
  }
  IncreaseAmount2(index:number) {
    this.localCart[index].amount++
    this.GetCartTotal()
    localStorage.setItem("cart2", JSON.stringify(this.localCart))
  }
  // Decrrase amount
  DecreaseAmount(index:number) {
    this.cartArray[index].amount--
    this.GetCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartArray))
  }
  DecreaseAmount2(index:number) {
    this.localCart[index].amount--
    this.GetCartTotal()
    localStorage.setItem("cart2", JSON.stringify(this.localCart))
  }
  // clear Cart Function
  clearCart() {
    Swal.fire({
      title :  'Are you sure?',
      text : "You won't be able to revert this!",
      icon :  'warning',
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Products has been deleted.',
          'success'
        )
        this.cartArray = JSON.parse(localStorage.getItem("cart")!)
        this.cartArray = []
        localStorage.setItem("cart", JSON.stringify(this.cartArray))
        this.localCart = JSON.parse(localStorage.getItem("cart2")!)
        this.localCart = []
        localStorage.setItem("cart2", JSON.stringify(this.localCart))
        this.total = 0 
        this._GetProductsService.changeLength(this.cartArray.length)
        this._GetProductsService.changeLength2(this.localCart.length)
      }
    })
  }
  // handle Delete Button Function
  deleteButton(index:number) {
    Swal.fire({
      title :  'Are you sure?',
      text : "You won't be able to revert this!",
      icon :  'warning',
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Products has been deleted.',
          'success'
        )
        if(index === 0){
          this.cartArray.shift()
          localStorage.setItem("cart", JSON.stringify(this.cartArray))
          this.GetCart()
          this._GetProductsService.changeLength(this.cartArray.length)
        }else{
          this.cartArray.splice(index, index);
          localStorage.setItem("cart", JSON.stringify(this.cartArray))
          this.GetCart()
          this._GetProductsService.changeLength(this.cartArray.length)
        }
      }
    })

  }
  deleteButton2(index:number) {
    Swal.fire({
      title :  'Are you sure?',
      text : "You won't be able to revert this!",
      icon :  'warning',
      showCancelButton : true,
      confirmButtonColor : '#3085d6',
      cancelButtonColor : '#d33',
      confirmButtonText : 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your Products has been deleted.',
          'success'
        )
        if(index === 0){
          this.localCart.shift()
          localStorage.setItem("cart2", JSON.stringify(this.localCart))
          this.GetCart()
          this._GetProductsService.changeLength2(this.localCart.length)
        }else{
          this.localCart.splice(index, index);
          localStorage.setItem("cart2", JSON.stringify(this.localCart))
          this.GetCart()
          this._GetProductsService.changeLength2(this.localCart.length) 
        }
      }
    })

  }
// function to send new Cart to backend
  SendData() {
    let products = this.cartArray.map((item) =>{
      return{productId:item.item.id,quantity:item.amount}
    })
    let Modal = {
      userId:5,
      date:new Date(),
      products:products
    }
    this._GetProductsService.SendNewCart(Modal).subscribe({
      next : (result) => {
          console.log(result);
          // localStorage.clear();
          this.cartArray = JSON.parse(localStorage.getItem("cart")!)
          this.cartArray = []
          localStorage.setItem("cart", JSON.stringify(this.cartArray))
          this.localCart = JSON.parse(localStorage.getItem("cart2")!)
          this.localCart = []
          localStorage.setItem("cart2", JSON.stringify(this.localCart))
          this._GetProductsService.changeLength(this.cartArray.length)  
          this._GetProductsService.changeLength2(this.localCart.length)  
          this.total = 0 
          Swal.fire({
            icon: 'success',
            title: 'Your Order have been sent', 
            showConfirmButton: false,
            timer: 2500
        })
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  // function to send new Cart to backend
  ngOnInit(): void {
    this.GetCart()
  }
}
