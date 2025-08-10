import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-front-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css',
})
export class FrontPageComponent {
  constructor(private backend: BackendService) {}

  data: any = {};

  ngOnInit() {
    this.backend.getCommunities().subscribe((res) => {
      this.data = res;
    });
  }
}
