import { Component } from '@angular/core';
import { TopStoriesService } from './top-stories.service';
import { StoriesPageComponent } from '../stories-page.component';

@Component({
  selector: 'top-stories',
  template: '<story-list [stories$]="stories$"></story-list>',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent extends StoriesPageComponent {
  constructor(private topStoriesService: TopStoriesService) {
    super(topStoriesService);
  }
}
