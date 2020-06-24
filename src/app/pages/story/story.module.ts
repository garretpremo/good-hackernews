import { NgModule } from '@angular/core';
import { StoryComponent } from './story.component';
import { SharedModule } from '../../shared/shared.module';
import { StoryRoutingModule } from './story-routing.module';
import { StoryService } from './story.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [ StoryComponent, CommentComponent ],
  imports: [
    SharedModule,
    StoryRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTooltipModule,
  ],
  exports: [
    StoryRoutingModule
  ],
  providers: [
    StoryService
  ]
})
export class StoryModule { }
