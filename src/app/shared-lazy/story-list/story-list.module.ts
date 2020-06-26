import { NgModule } from '@angular/core';
import { StoryListComponent } from './story-list.component';
import { StoryListStoryComponent } from './story-list-story/story-list-story.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    StoryListComponent,
    StoryListStoryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [
    StoryListComponent
  ]
})
export class StoryListModule {
}
