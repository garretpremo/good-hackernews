import { Injectable, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { StoryApiService } from '../../../service/story-api.service';
import { StoriesPageService } from '../../stories-page.service';
import { ItemApiService } from '../../../service/item-api.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { SubSink } from 'subsink';

@Injectable()
export class UserSubmissionsService extends StoriesPageService implements OnDestroy {

  private readonly fetchMoreSubject = new BehaviorSubject<void>(null);
  readonly fetchMore$ = this.fetchMoreSubject.asObservable();

  private readonly takeUntilSubject = new Subject<void>();

  private page = 1;
  private hiddenPage = 1;
  private pageSize = 30;

  private readonly subscriptions = new SubSink();

  constructor(private userService: UserService,
              private itemApiService: ItemApiService) {
    super();

    this.subscriptions.sink = combineLatest([this.userService.user$, this.fetchMore$])
      .pipe(
        filter(([user]) => user !== null),
        switchMap(([user]) => {
          return this.itemApiService.getStories(user.submitted, this.hiddenPage++, this.pageSize);
        }),
        tap(stories => {
          if (this?.stories && this.stories.length + stories.length < this.page * this.pageSize) {
            this.fetchMore();
          }
        }),
        takeUntil(this.takeUntilSubject),
        tap(() => {
          if (this.hiddenPage * this.pageSize >= this.userService.user.submitted.length) {
            this.takeUntilSubject.next();
          }
        })
      ).subscribe(stories => {
        const currentStories = this.stories;
        this.stories = currentStories !== null ? currentStories.concat(stories) : stories;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  fetchMore(incrementPage = false) {
    if (incrementPage) {
      this.page++;
    }

    this.fetchMoreSubject.next();
  }
}
