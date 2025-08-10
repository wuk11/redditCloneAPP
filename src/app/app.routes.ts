import { Routes } from '@angular/router';
import { FrontPageComponent } from './front-page/front-page.component';

export const routes: Routes = [
  { path: '', component: FrontPageComponent },
  {
    path: 'community/:id',
    loadComponent: async () => {
      const m = await import('./community-page/community-page.component');
      return m.CommunityPageComponent;
    },
  },
  {
    path: 'community/:communityId/article/:id',
    loadComponent: async () => {
      const m = await import('./article-page/article-page.component');
      return m.ArticlePageComponent;
    },
  },
  {
    path: 'login',
    loadComponent: async () => {
      const m = await import('./login-page/login-page.component');
      return m.LoginPageComponent;
    },
  },
  {
    path: 'register',
    loadComponent: async () => {
      const m = await import('./register-page/register-page.component');
      return m.RegisterPageComponent;
    },
  },
];
