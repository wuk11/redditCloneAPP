import { Component, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css',
})
export class ArticlePageComponent {
  commentForm: FormGroup;

  constructor(
    private backend: BackendService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      text: [''],
    });
  }

  private route = inject(ActivatedRoute);
  articleId!: string;
  articleData: any = {};
  commentData: any = {};

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  postComment(id: string) {
    const { text } = this.commentForm.value;
    this.backend.postComment(id, text).subscribe((res) => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;

    this.backend.getArticleData(this.articleId).subscribe((res) => {
      this.articleData = res;
    });

    this.backend.getComments(this.articleId).subscribe((res) => {
      this.commentData = res;
      console.log(this.commentData);
    });
  }

  delete(id: string) {
    this.backend.deleteComment(id).subscribe((res) => {
      window.location.reload();
    });
  }
}
