import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BackendService } from '../backend.service';
import { ArticlePageComponent } from '../article-page/article-page.component';

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

  upvoteArticle(id: string) {
    this.backend.upvoteArticle(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  downvoteArticle(id: string) {
    this.backend.downvoteArticle(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  selectSortButton(event: any) {
    this.sortComments(event.target.value);
  }

  sortComments(sort: string) {
    switch (sort) {
      case 'hot':
        this.data.articles.sort(
          (a: any, b: any) => this.hotnessScore(b) - this.hotnessScore(a)
        );
        break;
      case 'karma':
        this.data.articles.sort((a: any, b: any) => b.karma - a.karma);
        break;
      case 'oldest':
        this.data.articles.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'latest':
        this.data.articles.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
  }

  hotnessScore(item: any) {
    const s = item.karma;
    const order = Math.log10(Math.max(Math.abs(s), 1));
    const sign = s > 0 ? 1 : s < 0 ? -1 : 0;
    const seconds = new Date(item.createdAt).getTime() / 1000 - 1134028003;

    return sign * order + seconds / 45000;
  }
}
