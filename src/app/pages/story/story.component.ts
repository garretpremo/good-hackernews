import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { PageComponent } from '../page.component';
import { StoryService } from './story.service';
import { filter } from 'rxjs/operators';
import { Story } from '../../shared/models/story.model';
import { Title } from '@angular/platform-browser';
import { StoryComment } from './story-comment.model';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: [ './story.component.scss', '../../shared/components/story-list/story-list-story/story-info.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class StoryComponent extends PageComponent implements OnInit, OnDestroy {
  appPage = false;

  routeSubscription: Subscription;
  storySubscription: Subscription;
  story$: Observable<Story>;
  comments$: Observable<StoryComment[]>;

  constructor(titleService: Title,
              private route: ActivatedRoute,
              private storyService: StoryService) {
    super(titleService);
  }

  ngOnInit() {
    this.story$ = this.storyService.story$;
    this.comments$ = this.storyService.comments$;

    this.routeSubscription = this.route.params.subscribe(params => {
      this.storyService.story = null;
      this.storyService.comments = null;
      this.loading = true;
      this.storyService.fetchStory(params.id);
    });

    this.storySubscription = this.storyService.story$
      .pipe(filter(story => story !== null))
      .subscribe(story => {
        this.loading = false;
        this.setTitle(story.title);
        this.storyService.fetchComments();
      });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.storySubscription.unsubscribe();
  }
}
