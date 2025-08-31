import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../backend.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-article-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-article-page.component.html',
  styleUrl: './create-article-page.component.css',
})
export class CreateArticlePageComponent {
  articleForm: FormGroup;

  constructor(
    private backend: BackendService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      title: [''],
      text: [''],
      image: [''],
      tag: [''],
    });
  }

  private route = inject(ActivatedRoute);
  communityId!: string;

  ngOnInit() {
    this.communityId = this.route.snapshot.paramMap.get('communityId')!;
  }

  onFormSubmit() {
    const { title, text, image, tag } = this.articleForm.value;

    this.backend
      .postArticle(this.communityId, title, text, image, tag)
      .subscribe((res) => {
        this.router.navigate(['community/' + this.communityId]);
      });
  }
}
