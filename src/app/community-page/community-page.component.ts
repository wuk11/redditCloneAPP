import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-community-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.css',
})
export class CommunityPageComponent {
  constructor(private backend: BackendService) {}

  private route = inject(ActivatedRoute);
  communityId!: string;
  data: any = {};
  communityData: any = {};
  communityName: string = '';

  ngOnInit() {
    this.communityId = this.route.snapshot.paramMap.get('id')!;

    this.backend.getArticlesFromCommunity(this.communityId).subscribe((res) => {
      this.data = res;
    });

    this.backend.getCommunities().subscribe((res) => {
      this.communityData = res;
      const community = this.communityData.communities.find(
        (c: any) => c.id == this.communityId
      );
      this.communityName = community ? community.name : 'Unknown';
    });
  }
}
