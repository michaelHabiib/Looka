import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
declare var $:any;
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = false;
  products: any[] = [];
  modal: {} = {};
  fakeImage = 'https://i.pravatar.cc';
  OurProducts: any[] = [];
  arrayIndex: number = 0;
  updateProductValue: any;
  base64: any;
  base65: any;
  constructor(private _AdminServiceService: AdminServiceService) {}

  productForm = new FormGroup({
    TitleForm: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    PriceForm: new FormControl('', [
      Validators.required,
      Validators.max(100000),
    ]),
    DescrptionForm: new FormControl('', Validators.required),
    ImageForm: new FormControl('', Validators.required),
    CatrgoryForm: new FormControl('', Validators.required),
  });

  UpdateproductForm = new FormGroup({
    UpdateTitleForm: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(2)])
    ),
    UpdatePriceForm: new FormControl('', [
      Validators.required,
      Validators.max(100000),
    ]),
    UpdateDescrptionForm: new FormControl('', Validators.required),
    UpdateCatrgoryForm: new FormControl('', Validators.required),
    UpdateImageForm: new FormControl('', Validators.required),
  });

  showmodal() {
    $('.fakeImage2').addClass('d-none');
  }
  // to Get Product From Api
  GetProduct() {
    if (this.productForm.controls.TitleForm.status === 'VALID') {
      if (this.productForm.controls.PriceForm.status === 'VALID') {
        if (this.productForm.controls.DescrptionForm.status === 'VALID') {
          if (this.productForm.controls.CatrgoryForm.status === 'VALID') {
            this.modal = {
              title: this.productForm.value.TitleForm,
              price: this.productForm.value.PriceForm,
              description: this.productForm.value.DescrptionForm,
              image: this.base64,
              category: this.productForm.value.CatrgoryForm,
            };
            $('#exampleModal').modal('hide');
            if (localStorage.getItem('OurProducts')) {
              this.OurProducts = JSON.parse(
                localStorage.getItem('OurProducts')!
              );
              this.OurProducts.push(this.modal);
              localStorage.setItem(
                'OurProducts',
                JSON.stringify(this.OurProducts)
              );
              console.log(this.modal);
              Swal.fire({
                icon: 'success',
                title: 'Your Product added successfully',
                showConfirmButton: false,
                timer: 2500,
              });
            }
            this.productForm.reset();
          } else {
            $('#exampleModal').modal('hide');
            Swal.fire('Your product category is Required');
            this.productForm.reset();
          }
        } else {
          $('#exampleModal').modal('hide');
          Swal.fire('Your product Descrption is Required');
          this.productForm.reset();
        }
      } else {
        $('#exampleModal').modal('hide');
        Swal.fire('Your Product Price is Required');
        this.productForm.reset();
      }
    } else {
      $('#exampleModal').modal('hide');
      Swal.fire('Your Product Title is Required');
      this.productForm.reset();
    }
  }

  // when i refresh My Page ourproduct need to be called
  refreshPage() {
    if (localStorage.getItem('OurProducts')) {
      return (this.OurProducts = JSON.parse(
        localStorage.getItem('OurProducts')!
      ));
    } else {
      localStorage.setItem('OurProducts', JSON.stringify([]));
      this.OurProducts = JSON.parse(localStorage.getItem('OurProducts')!);
    }

    // console.log(this.OurProducts);
  }

  // method to delete product
  DeleteProduct(title: any) {
    this.OurProducts = JSON.parse(localStorage.getItem('OurProducts')!);
    this.OurProducts.filter((ourProduct) => {
      if (ourProduct.title === title) {
        this.arrayIndex === this.OurProducts.indexOf(ourProduct);
        this.OurProducts.splice(this.arrayIndex, 1);
        localStorage.setItem('OurProducts', JSON.stringify(this.OurProducts));
      }
      Swal.fire({
        icon: 'success',
        title: 'Your Product Deleted successfully',
        showConfirmButton: false,
        timer: 2500,
      });
    });
  }
  // method to open product modal
  openUpdateProductModal(i: number, product: any) {
    $('.fakeImage2').addClass('d-none');
    this.UpdateproductForm = new FormGroup({
      UpdateTitleForm: new FormControl(product.title),
      UpdatePriceForm: new FormControl(product.price),
      UpdateDescrptionForm: new FormControl(product.description),
      UpdateCatrgoryForm: new FormControl(product.category),
      UpdateImageForm: new FormControl(),
    });
    this.arrayIndex = i - 1;
  }

  // method to update product
  UpdateProduct() {
    if (this.UpdateproductForm.controls.UpdateTitleForm.status === 'VALID') {
      if (this.UpdateproductForm.controls.UpdatePriceForm.status === 'VALID') {
        if (
          this.UpdateproductForm.controls.UpdateDescrptionForm.status ===
          'VALID'
        ) {
          if (
            this.UpdateproductForm.controls.UpdateCatrgoryForm.status ===
            'VALID'
          ) {
            $('#UpdateModal').modal('hide');
            this.OurProducts = JSON.parse(localStorage.getItem('OurProducts')!);
            this.OurProducts[this.arrayIndex] = {
              category: this.UpdateproductForm.controls.UpdateTitleForm.value,
              description:
                this.UpdateproductForm.controls.UpdateDescrptionForm.value,
              image: this.base65,
              price: this.UpdateproductForm.controls.UpdatePriceForm.value,
              title: this.UpdateproductForm.controls.UpdateTitleForm.value,
            };
            localStorage.setItem(
              'OurProducts',
              JSON.stringify(this.OurProducts)
            );
            console.log(this.UpdateproductForm.errors);
          } else {
            $('#UpdateModal').modal('hide');
            Swal.fire('Your product category is Required');
            this.UpdateproductForm.reset();
          }
        } else {
          $('#UpdateModal').modal('hide');
          Swal.fire('Your product Descrption is Required');
          this.UpdateproductForm.reset();
        }
      } else {
        $('#UpdateModal').modal('hide');
        Swal.fire('Your Product Price is Required');
        this.UpdateproductForm.reset();
      }
    } else {
      $('#UpdateModal').modal('hide');
      Swal.fire('Your Product Title is Required');
      this.UpdateproductForm.reset();
    }
  }

  GetImagePass(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
    };
    $('img').removeClass('d-none');
  }
  GetImagePass2(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base65 = reader.result;
    };
    $('img').removeClass('d-none');
  }
  dataSource = new MatTableDataSource(this.OurProducts);
  ngOnInit(): void {
    // this.GetAllProducts()
    this.refreshPage();
  }
}
