import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PageComponent } from '../page.component';
import { StoryService } from './story.service';
import { filter } from 'rxjs/operators';
import { Story } from '../../shared/models/story.model';
import { Title } from '@angular/platform-browser';
import { StoryComment } from './story-comment.model';
import { SubSink } from 'subsink';

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: [ './story.component.scss', '../../shared/components/story-list/story-list-story/story-info.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoryComponent extends PageComponent implements OnInit, OnDestroy {
  appPage = false;

  private readonly subscriptions = new SubSink();
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

    this.subscriptions.sink = this.route.params.subscribe(params => {
      this.storyService.story = null;
      this.storyService.comments = null;
      this.loading = true;
      this.storyService.fetchStory(params.id);
    });

    this.subscriptions.sink = this.storyService.story$
      .pipe(filter(story => story !== null))
      .subscribe(story => {
        this.loading = false;
        this.setTitle(story.title);
        this.storyService.fetchComments();
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  @HostListener('touchstart', ['$event']) onTouchStart(event: TouchEvent) {
    this.storyService.touchStartEvent = event;
  }

  @HostListener('touchmove') onTouchMove() {
    this.storyService.touchStartEvent = null;
  }

  @HostListener('touchend') onTouchEnd() {
    this.storyService.touchStartEvent = null;
  }
}
