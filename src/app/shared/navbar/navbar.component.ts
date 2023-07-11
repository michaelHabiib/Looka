import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GetProductsService } from 'src/app/users/get-products.service';
declare var $:any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  theme:string = "light-mode"
  data:any = ';'
  result:any[]= [];
  cartLength:any = 0;
  CartArrayLength : any
  LocalCartLength : any
  totalCartLength :any
  constructor(@Inject(DOCUMENT) public document :Document,
  public render :Renderer2,
  public _GetProductsService: GetProductsService) {}
  // method to set Intial theme
  intialTheme = () : void =>
  this.render.addClass(this.document.body, this.theme);
  // method to set Intial theme
  // method to switch to light Mode
  switchThemeToLight(){
    this.document.body.classList.remove('dark-mode')
    this.document.body.classList.add('light-mode')
  }
  // method to switch to light Mode
  // method to switch to Dark Mode
  switchThemeToDark(){
    this.document.body.classList.replace(this.theme, 'dark-mode')
  }
    // method to switch to Dark Mode
    // method to set user in localstoarge
  switchAuth() {
    this._GetProductsService.isUser = false
    this.seetings()
  }
      // method to set user in localstoarge
      // method to set admin in localstoarge
  switchAuth2(){
    this._GetProductsService.isUser = true
    this.seetings()
  }
// method to set admin in localstoarge

seetings(){
  $('.auth').toggleClass("authMove")
  $('.fa-gear').toggleClass("fa-gearMove")
  $('.fa-gear').toggleClass("fa-spin")
}
  ngOnInit(): void {
    this.intialTheme()
    this._GetProductsService.length.subscribe((val) =>{
      this.CartArrayLength = val
      this.totalCartLength = this.CartArrayLength + this.LocalCartLength
    })
    this._GetProductsService.length2.subscribe((val) =>{
      this.LocalCartLength = val
      this.totalCartLength = this.CartArrayLength + this.LocalCartLength
    })
    
  }
}
export type theme = 'light-mode' | 'dark-mode';
