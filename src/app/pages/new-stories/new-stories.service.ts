import { Injectable } from '@angular/core';
import { StoriesPageService } from '../stories-page.service';
import { StoryApiService } from '../../service/story-api.service';

@Injectable()
export class NewStoriesService extends StoriesPageService {

  constructor(private newsApiService: StoryApiService) {
    super();
    newsApiService.getNewStories().subscribe(stories => this.stories = stories);
  }
}
