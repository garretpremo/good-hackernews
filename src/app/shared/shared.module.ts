import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TimeSincePipe } from './pipes/time-since.pipe';
import { UrlPipe } from './pipes/url.pipe';
import { StoryListComponent } from './components/story-list/story-list.component';
import { StoryListStoryComponent } from './components/story-list/story-list-story/story-list-story.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    StoryListComponent,
    StoryListStoryComponent,
    LoadingSpinnerComponent,
    TimeSincePipe,
    UrlPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    StoryListComponent,
    LoadingSpinnerComponent,
    TimeSincePipe,
    UrlPipe,
  ]
})
export class SharedModule { }
