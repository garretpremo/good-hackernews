import { Injectable } from '@angular/core';
import { NewsApiService } from '../../service/news-api.service';
import { StoriesPageService } from '../stories-page.service';

@Injectable()
export class TopStoriesService extends StoriesPageService {

  constructor(private newsApiService: NewsApiService) {
    super();
    this.newsApiService.getTopStories().subscribe(stories => this.stories = stories);
  }

}
