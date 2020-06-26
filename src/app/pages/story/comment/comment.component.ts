import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StoryComment } from '../story-comment.model';
import { StoryService } from '../story.service';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: [ './comment.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {

  @Input()
  comment: StoryComment;

  @HostBinding('class.show-comments')
  showComments = true;

  @HostBinding('class.root')
  @Input()
  root = false;

  @HostBinding('class.odd')
  @Input()
  odd: boolean;

  @HostBinding('id')
  id: number;

  @Input()
  depth: number;

  private readonly commentsHiddenTextSubject = new BehaviorSubject<string>('+');
  readonly commentsHiddenText$ = this.commentsHiddenTextSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private storyService: StoryService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.id = this.comment.id;
  }

  @HostListener('touchend', ['$event']) onTap(event) {
    event.stopPropagation();

    // @ts-ignore
    if (this.storyService.touchStartEvent?.path?.includes(this.elementRef.nativeElement)) {
      this.toggleShowComments();
    }
  }

  toggleShowComments(event = null) {
    if (event !== null) {
      event.stopPropagation();
    }

    if (this.comment.open) {
      this.setCommentsHiddenText();
    }

    this.comment.open = !this.comment.open;
  }

  setCommentsHiddenText() {
    if (this.comment?.kids) {
      this.commentsHiddenText = `${1 + this.comment.subCommentCount} more`;
    }
  }

  get commentsHiddenText(): string {
    return this.commentsHiddenTextSubject.getValue();
  }

  set commentsHiddenText(commentsHiddenText: string) {
    this.commentsHiddenTextSubject.next(commentsHiddenText);
  }
}
