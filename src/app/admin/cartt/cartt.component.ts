import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-cartt',
  templateUrl: './cartt.component.html',
  styleUrls: ['./cartt.component.css']
})
export class CarttComponent implements OnInit {
  carts: any[] =[]
  cart:any [] =[]
  proudcts: any 
  isloaded:boolean =false
  amountArray:any [] = []
  finalArray:any [] = []
  isLoading:Boolean = false
  constructor(public _AdminServiceService: AdminServiceService) {
  }

  GetAllCarts(){
    this.isLoading = true
    this._AdminServiceService.GetAllCarts().subscribe({
      next: (result) => {
        // console.log(result); 
        this.isLoading = false
        this.carts = result.carts
      },
      error: (err) => {
        this.isLoading = false
        console.log(err);
      }
    })
  }
  DeleteCart(cartId: any) {
    this._AdminServiceService.DeleteCart(cartId).subscribe({
      next : (result) =>{
        // if(result.isDeleted === 'true'){
          Swal.fire({
            icon: 'success',
            title: 'Your Cart Deleted successfully',
            text: 'unfortunately Your cart will not be deleted on the database becouse it is a fake Api',
            showConfirmButton: false,
            timer: 4500
          })
      },
      error :(err) => {
        console.log(err);
      }
    })
  }

  ViewCart(cartIndex: any) {
    this.proudcts = []
      this._AdminServiceService.GetSingleCart(cartIndex).subscribe({
      next: (res) => {
        this.cart = res.products
        for(let x in res.products) {
          this.amountArray.push(res.products[x].quantity) 
          this._AdminServiceService.GetSingleProduct(res.products[x].productId).subscribe({
            next :(res) =>{
              this.proudcts.push(res)
            },
            error :(err) =>{
              console.log(err);
            }
          })
        }
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this.GetAllCarts()
  }
}
