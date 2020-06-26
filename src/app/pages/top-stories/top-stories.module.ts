import { NgModule } from '@angular/core';
import { TopStoriesComponent } from './top-stories.component';
import { SharedModule } from '../../shared/shared.module';
import { TopStoriesService } from './top-stories.service';
import { TopStoriesRoutingModule } from './top-stories-routing.module';
import { StoryListModule } from '../../shared-lazy/story-list/story-list.module';

@NgModule({
  declarations: [ TopStoriesComponent ],
  imports: [
    SharedModule,
    StoryListModule,
    TopStoriesRoutingModule,
  ],
  exports: [ TopStoriesRoutingModule ],
  providers: [ TopStoriesService ]
})
export class TopStoriesModule { }
