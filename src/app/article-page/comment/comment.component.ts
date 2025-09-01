import { Component, Input } from '@angular/core';
import { BackendService } from '../../backend.service';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  commentForm: FormGroup;
  replyForm: FormGroup;

  constructor(
    private backend: BackendService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      text: [''],
    });
    this.replyForm = this.fb.group({
      text: [''],
    });
  }

  @Input() comment: any = {};

  activeReplyId: string | null = null;

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  delete(id: string) {
    this.backend.deleteComment(id).subscribe((res) => {
      window.location.reload();
    });
  }

  postReply(id: string) {
    const { text } = this.replyForm.value;
    this.backend.postReply(id, text).subscribe((res) => {
      window.location.reload();
    });
  }

  toggleReply(id: string) {
    if (this.activeReplyId === id) {
      this.activeReplyId = null;
    } else {
      this.activeReplyId = id;
    }
  }

  upvoteComment(id: string) {
    this.backend.upvoteComment(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  downvoteComment(id: string) {
    this.backend.downvoteComment(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }
}
