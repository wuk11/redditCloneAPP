import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-community-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-community-page.component.html',
  styleUrl: './create-community-page.component.css',
})
export class CreateCommunityPageComponent {
  createCommunityForm: FormGroup;

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createCommunityForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  onFormSubmit(event: any) {
    event.preventDefault();
    const { name, description } = this.createCommunityForm.value;
    this.backend.postCommunity(name, description).subscribe((res) => {
      this.router.navigate(['']);
    });
  }
}
