import { PageComponent } from './page.component';
import { OnDestroy, OnInit, Directive } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Story } from '../shared/models/story.model';
import { filter, take } from 'rxjs/operators';
import { StoriesPageService } from './stories-page.service';
import { Title } from '@angular/platform-browser';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class StoriesPageComponent extends PageComponent implements OnInit, OnDestroy {
  stories$: Observable<Story[]>;
  private storiesSubscription: Subscription;

  protected constructor(titleService: Title,
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
