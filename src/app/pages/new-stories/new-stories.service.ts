import { Injectable } from '@angular/core';
import { StoriesPageService } from '../stories-page.service';
import { NewsApiService } from '../../service/news-api.service';

@Injectable()
export class NewStoriesService extends StoriesPageService {

  constructor(private newsApiService: NewsApiService) {
    super();
    newsApiService.getNewStories().subscribe(stories => this.stories = stories);
  }
}
