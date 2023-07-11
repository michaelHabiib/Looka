import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { GetProductsService } from '../get-products.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js'; 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  result: any[] =[]
  data:any = ';'
  productDiscrption:string = "";
  shortdisc:any= "";
  CatData:any = ''
  CatResult:any[] = []
  productCAtData:any = ''
  CategoryValue:any =''
  isLoading:Boolean = false
  cartArray:any= [];
  cartView:boolean = false
  cat :string = ''
  filterArray: any = []
  searchWord:string = ''
  localArray: any = []
  constructor(public _GetProductsService :GetProductsService){
  }

  getAllProducts () {
    this.isLoading = true
    this._GetProductsService.GetAllProducts().subscribe({
      next : (Products) => {
        this.isLoading = false
        this.result = Products    
        // console.log(this.result);
        
      },
      error : (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
  }


  GetLocalProducts(){
    if(localStorage.getItem('OurProducts')){
      this.localArray = JSON.parse(localStorage.getItem("OurProducts")!)
    }
  }

  filterCategory($event:any){
    this.result = this.result.filter((res) =>{
      return res.title.toLowerCase().includes($event.toLowerCase())
    })
    console.log(this.result);
      
  }

  
  getProductsInCat (keyword:String) {
    this.isLoading = true
    this._GetProductsService.GetProductsInCatgories(keyword).subscribe({
      next : (data) => {
        this.isLoading = false
        // console.log(data) 
        this.result = data   
      },
      error : (err) => {
        this.isLoading = false
        console.log(err)
      }
    })
  }

  add(pro:any) {
    // console.log(pro);
    if("cart" in localStorage){
      this.cartArray = JSON.parse(localStorage.getItem("cart")!)
      let exessitArray = this.cartArray.find((item: { id: any; }) => item.id == pro.id)
      console.log(exessitArray);
      if(exessitArray){
        Swal.fire(`${exessitArray.title} is already in Your Cart`)
      }else{
        this.cartArray.push(pro)
        localStorage.setItem("cart", JSON.stringify(this.cartArray))
      }
    }else{
      this.cartArray.push(pro)
      localStorage.setItem("cart", JSON.stringify(this.cartArray))
    }
  }

  ngOnInit(): void {
    this.getAllProducts()
    this.GetLocalProducts()
  }
}
