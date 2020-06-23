import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewStoriesComponent } from './new-stories.component';

const routes: Routes = [
  {
    path: '',
    component: NewStoriesComponent,
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NewStoriesRoutingModule {
}
