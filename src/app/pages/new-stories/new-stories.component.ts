import { Component } from '@angular/core';
import { StoriesPageComponent } from '../stories-page.component';
import { NewStoriesService } from './new-stories.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'new-stories',
  template: '<story-list [stories$]="stories$"></story-list>',
  styleUrls: ['./new-stories.component.scss']
})
export class NewStoriesComponent extends StoriesPageComponent {
  protected readonly title: string = 'Newest Hacker News';

  constructor(titleService: Title,
              private newStoriesService: NewStoriesService) {
    super(titleService, newStoriesService);
  }
}
