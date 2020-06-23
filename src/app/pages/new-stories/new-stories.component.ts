import { Component } from '@angular/core';
import { StoriesPageComponent } from '../stories-page.component';
import { NewStoriesService } from './new-stories.service';

@Component({
  selector: 'new-stories',
  template: '<story-list [stories$]="stories$"></story-list>',
  styleUrls: ['./new-stories.component.scss']
})
export class NewStoriesComponent extends StoriesPageComponent {
  constructor(private newStoriesService: NewStoriesService) {
    super(newStoriesService);
  }
}
