import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent {
  //@Input() userData: any = {};

  constructor(private backend: BackendService) {}

  userData: any = {};

  ngOnInit() {
    this.backend.getMe().subscribe((res: any) => {
      this.userData = res.user;
    });
  }
}
