import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  form:any = {}
  constructor(){}

  contactForm = new FormGroup({
    NameForm: new FormControl('', [Validators.required]),
    EmailForm: new FormControl('', [Validators.required, Validators.email]),
    MassageForm: new FormControl('', Validators.required),
  });

  getErrorMessageName(){
    if (this.contactForm.controls.NameForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }
  getErrorMessageEmail() {
    if (this.contactForm.controls.EmailForm.hasError('required')) {
      return 'You must enter a value';
    }
    return this.contactForm.controls.EmailForm.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessageMassage(){
    if (this.contactForm.controls.MassageForm.hasError('required')) {
      return 'You must enter a value';
    }else{
      return '';
    }
  }

  onSubmit(form:any){
    if(form.status === 'VALID'){
      Swal.fire({
        icon: 'success',
        title: `Thank You For Your Massage ${form.controls.NameForm.value}`,
      })
      this.contactForm.reset()
    }else {
    }
    
  }
}
