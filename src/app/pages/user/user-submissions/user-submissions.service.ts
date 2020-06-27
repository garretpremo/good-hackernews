import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { filter, switchMap } from 'rxjs/operators';
import { NewsApiService } from '../../../service/news-api.service';
import { StoriesPageService } from '../../stories-page.service';

@Injectable()
export class UserSubmissionsService extends StoriesPageService {

  constructor(private userService: UserService,
              private newsApiService: NewsApiService) {
    super();

    this.userService.user$
      .pipe(
        filter(user => user !== null),
        switchMap(user => this.newsApiService.getStoriesFromIds(user.submitted))
      ).subscribe(stories => this.stories = stories);
  }
}
