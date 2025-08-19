import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getCommunities() {
    return this.http.get('http://localhost:3000/community/');
  }

  getArticlesFromCommunity(id: string) {
    return this.http.get('http://localhost:3000/community/' + id + '/articles');
  }

  getArticleData(id: string) {
    return this.http.get('http://localhost:3000/community/articles/' + id);
  }

  getComments(id: string) {
    return this.http.get('http://localhost:3000/comment/' + id);
  }

  postLogin(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/login', {
      username,
      password,
    });
  }

  postComment(id: string, text: string) {
    return this.http.post('http://localhost:3000/comment/' + id, { text });
  }

  postReply(id: string, text: string) {
    return this.http.post('http://localhost:3000/comment/reply/' + id, {
      text,
    });
  }

  postRegister(username: string, password: string, email: string) {
    return this.http.post('http://localhost:3000/auth/signup', {
      username,
      password,
      email,
    });
  }

  deleteComment(id: string) {
    return this.http.delete('http://localhost:3000/comment/' + id);
  }

  upvoteComment(id: string) {
    return this.http.post('http://localhost:3000/comment/upvote/' + id, {});
  }

  downvoteComment(id: string) {
    return this.http.post('http://localhost:3000/comment/downvote/' + id, {});
  }

  upvoteArticle(id: string) {
    return this.http.post(
      'http://localhost:3000/community/article/' + id + '/upvote',
      {}
    );
  }

  downvoteArticle(id: string) {
    return this.http.post(
      'http://localhost:3000/community/article/' + id + '/downvote',
      {}
    );
  }
}
