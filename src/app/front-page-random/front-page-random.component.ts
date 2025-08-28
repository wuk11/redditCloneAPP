import { Component } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-front-page-random',
  imports: [],
  templateUrl: './front-page-random.component.html',
  styleUrl: './front-page-random.component.css',
})
export class FrontPageRandomComponent {
  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getCommunities().subscribe((res: any) => {
      console.log(res);
    });
  }
}
