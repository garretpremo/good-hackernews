import { PageComponent } from './page.component';
import { OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Story } from '../shared/models/story.model';
import { filter, take } from 'rxjs/operators';
import { StoriesPageService } from './stories-page.service';
import { TopStoriesService } from './top-stories/top-stories.service';
import { Title } from '@angular/platform-browser';

export class StoriesPageComponent extends PageComponent implements OnInit, OnDestroy {
  stories$: Observable<Story[]>;
  private storiesSubscription: Subscription;

  constructor(titleService: Title,
              private storiesPageService: StoriesPageService) {
    super(titleService);
  }

  ngOnInit() {
    this.stories$ = this.storiesPageService.stories$;
    this.setTitle();

    this.storiesSubscription = this.storiesPageService.stories$
      .pipe(filter(stories => stories !== null), take(1))
      .subscribe(() => this.loading = false);
  }

  ngOnDestroy() {
    this.storiesSubscription.unsubscribe();
  }
}
