import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'top'
  },
  {
    path: 'top',
    loadChildren: () => import('./pages/top-stories/top-stories.module').then(m => m.TopStoriesModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./pages/new-stories/new-stories.module').then(m => m.NewStoriesModule)
  },
  {
    path: 'user/:id',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
