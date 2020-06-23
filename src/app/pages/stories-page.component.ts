import { PageComponent } from './page.component';
import { OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Story } from '../shared/models/story.model';
import { filter, take } from 'rxjs/operators';
import { StoriesPageService } from './stories-page.service';

export class StoriesPageComponent extends PageComponent implements OnInit, OnDestroy {
  stories$: Observable<Story[]>;
  private storiesSubscription: Subscription;

  constructor(private storiesPageService: StoriesPageService) {
    super();
  }

  ngOnInit() {
    this.stories$ = this.storiesPageService.stories$;

    this.storiesSubscription = this.storiesPageService.stories$
      .pipe(filter(stories => stories !== null), take(1))
      .subscribe(() => this.loading = false);
  }

  ngOnDestroy() {
    this.storiesSubscription.unsubscribe();
  }
}
