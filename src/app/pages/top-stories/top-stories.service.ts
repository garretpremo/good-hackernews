import { Injectable } from '@angular/core';
import { StoryApiService } from '../../service/story-api.service';
import { StoriesPageService } from '../stories-page.service';

@Injectable()
export class TopStoriesService extends StoriesPageService {

  constructor(private newsApiService: StoryApiService) {
    super();
    this.newsApiService.getTopStories().subscribe(stories => this.stories = stories);
  }

}
