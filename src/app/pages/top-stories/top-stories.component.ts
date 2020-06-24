import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TopStoriesService } from './top-stories.service';
import { StoriesPageComponent } from '../stories-page.component';

@Component({
  selector: 'top-stories',
  template: '<story-list [stories$]="stories$"></story-list>',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent extends StoriesPageComponent {
  protected readonly title: string = 'Top Hacker News';

  constructor(titleService: Title,
              private topStoriesService: TopStoriesService) {
    super(titleService, topStoriesService);
  }
}
