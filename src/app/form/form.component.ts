// import { Component, inject } from '@angular/core';
// import { CommunicationService } from '../service-folder/service.service';

// @Component({
//   selector: 'app-form',
//   imports: [],
//   templateUrl: './form.component.html',
//   styleUrl: './form.component.css'
// })
// export class FormComponent {

//   private httpSvc = inject(CommunicationService)
//   openCV(): void {
//     const cvUrl = 'assets/Rahul-cv.pdf';
//     window.open(cvUrl, '_blank');
//   }

//   submitForm(){
//     this.httpSvc.sendEmail()
//   }
// }


import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommunicationService } from '../service-folder/service.service';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  contactUsForm !: FormGroup;
  formBuild = inject(FormBuilder);
  private httpSvc = inject(CommunicationService)
  formSubmitted: boolean = false;
  ngOnInit(): void {
    this.contactUsForm = this.formBuild.group({
      name: [, [Validators.required,]],
      phoneNumber: [, Validators.required],
      subject: [, Validators.required],
      email: [, [Validators.required,]],
      message: []
    })
  }


    user = {
    name: '',
    phoneNumber:'',
    email: '',
    subject:'',
    message:''
  };

  onSubmit(form: any) {
    this.formSubmitted = true
    if (form.valid) {
    this.httpSvc.sendEmail(this.contactUsForm.value).subscribe({
      next: (x) => {
        console.log(x);
      }
    });
      console.log('Form Submitted!', this.user);
      alert('Form submitted successfully!');
    } else {
      console.log('Form is invalid');
    }
  }

  onReset(form: any) {
    form.resetForm();
    this.user = {
    name: '',
    phoneNumber:'',
    email: '',
    subject:'',
    message:''
    };
  }

  openCV(): void {
    const cvUrl = 'assets/Rahul-cv.pdf';
    window.open(cvUrl, '_blank');
  }

  submitForm(){
  }
}
