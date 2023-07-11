import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { ProductComponent } from './product/product.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { AppRoutingModule } from '../app-routing.module';
import { ImpProductComponent } from './imp-product/imp-product.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { LocalProductsComponent } from './local-products/local-products.component';
import { SingleLocalComponent } from './single-local/single-local.component'
import { MatIconModule }from '@angular/material/icon'


@NgModule({
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ],
    declarations: [
        LandingComponent,
        ProductComponent,
        SingleProductComponent,
        ImpProductComponent,
        CartComponent,
        AboutComponent,
        ContactComponent,
        LocalProductsComponent,
        SingleLocalComponent,
    ],
    exports: [
        ProductComponent,
        LandingComponent,
        ImpProductComponent,
        FormsModule,
        CartComponent,
        AboutComponent,
        LocalProductsComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
    ]
})
export class UsersModule { }
