import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  isDarkMode = false;

toggleDarkMode() {
  this.isDarkMode = !this.isDarkMode;
}

contactForm!: FormGroup;

  constructor(private fb: FormBuilder,) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.maxLength(500)
      ])
    });
  }

  sendEmail() {
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields correctly!',
      });
      return;
    }

    const templateParams = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    emailjs.send('service_hsas6hd', 'template_8iudeza', templateParams, 'KI7wwSTBU3tdjCTfv')
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been successfully sent. We will contact you soon!',
          timer: 3000,
          showConfirmButton: false,
        });
        this.contactForm.reset();
      })
      .catch(error => {
        console.error('Email sending error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an issue sending your message. Please try again later.',
        });
      });
  }

}
