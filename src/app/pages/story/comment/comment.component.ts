import { Component, ElementRef, Host, HostBinding, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StoryComment } from '../story-comment.model';
import { StoryService } from '../story.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: [ './comment.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class CommentComponent implements OnInit {

  @Input()
  comment: StoryComment;

  @HostBinding('class.show-comments')
  showComments = true;

  @HostBinding('class.root')
  @Input()
  root = true;

  @HostBinding('class.odd')
  @Input()
  odd: boolean;

  @HostBinding('id')
  id: number;

  @Input()
  depth: number;

  commentsHiddenText = '+';

  constructor(private storyService: StoryService,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.id = this.comment.id;

    if (this.comment?.kids) {
      this.commentsHiddenText = `${1 + this.comment.subComments} more`;
    }
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

    this.comment.open = !this.comment.open;
  }
}
