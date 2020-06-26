import { NgModule } from '@angular/core';
import { NewStoriesComponent } from './new-stories.component';
import { NewStoriesService } from './new-stories.service';
import { SharedModule } from '../../shared/shared.module';
import { NewStoriesRoutingModule } from './new-stories-routing.module';
import { StoryListModule } from '../../shared-lazy/story-list/story-list.module';

@NgModule({
  declarations: [ NewStoriesComponent ],
  imports: [
    SharedModule,
    StoryListModule,
    NewStoriesRoutingModule
  ],
  exports: [ NewStoriesRoutingModule ],
  providers: [ NewStoriesService ]
})
export class NewStoriesModule { }
