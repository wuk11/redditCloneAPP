import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private backend: BackendService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
      email: [''],
    });
  }

  onFormSubmit() {
    const { username, password, email } = this.registerForm.value;
    this.backend.postRegister(username, password, email).subscribe();
    console.log('Registered a new account!');
    this.router.navigate(['']);
  }
}
