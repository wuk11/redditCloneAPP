import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  changePassForm: FormGroup;
  changeDescForm: FormGroup;
  changeDisplayNameForm: FormGroup;
  changeImageForm: FormGroup;

  constructor(private backend: BackendService, private fb: FormBuilder) {
    this.changePassForm = this.fb.group({
      password: [''],
      newPassword: [''],
      confirmPassword: [''],
    });
    this.changeDescForm = this.fb.group({
      description: [''],
    });
    this.changeDisplayNameForm = this.fb.group({
      displayName: [''],
    });
    this.changeImageForm = this.fb.group({
      image: [''],
    });
  }

  userData: any = {};
  isFormVisible: boolean = false;
  isDescFormVisible: boolean = false;
  isDisplayNameFormVisible: boolean = false;
  isImageFormVisible: boolean = false;
  karma: number = 0;

  ngOnInit() {
    this.backend.getMe().subscribe((res: any) => {
      this.userData = res.user;
      this.backend.getUserKarma(res.user.id).subscribe((res: any) => {
        this.karma = res.totalKarma;
      });
    });
  }

  onPassFormSubmit(event: any) {
    event.preventDefault();
    const { password, newPassword } = this.changePassForm.value;
    this.backend
      .postChangePassword(password, newPassword)
      .subscribe((res: any) => {
        console.log(res);
      });
  }

  onDescFormSubmit(event: any) {
    event.preventDefault();
    const { description } = this.changeDescForm.value;
    this.backend.postChangeDescription(description).subscribe((res: any) => {
      this.backend.getMe().subscribe((res: any) => {
        this.userData = res.user;
      });
    });
  }

  onDisplayNameFormSubmit(event: any) {
    event.preventDefault();
    const { displayName } = this.changeDisplayNameForm.value;
    this.backend.postChangeDisplayName(displayName).subscribe((res: any) => {
      this.backend.getMe().subscribe((res: any) => {
        this.userData = res.user;
      });
    });
  }

  onImageFormSubmit(event: any) {
    event.preventDefault();
    const { image } = this.changeImageForm.value;
    this.backend.postChangeImage(image).subscribe((res: any) => {
      this.backend.getMe().subscribe((res: any) => {
        this.userData = res.user;
      });
    });
  }

  showChangePassForm() {
    this.isFormVisible = !this.isFormVisible!;
  }

  showChangeDescForm() {
    this.isDescFormVisible = !this.isDescFormVisible;
  }

  showChangeDisplayNameForm() {
    this.isDisplayNameFormVisible = !this.isDisplayNameFormVisible;
  }

  showChangeImageForm() {
    this.isImageFormVisible = !this.isImageFormVisible;
  }
}
