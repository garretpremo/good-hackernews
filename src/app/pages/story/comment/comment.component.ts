import { Component, Host, HostBinding, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { StoryComment } from '../story-comment.model';

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

  @Input()
  depth: number;

  commentsHiddenText = '+';

  constructor() {
  }

  ngOnInit() {
    if (this.comment?.kids) {
      this.commentsHiddenText = `${1 + this.comment.subComments} more`;
    }
  }

  @HostListener('click', ['$event']) toggleShowComment(event) {
    event.stopPropagation();
    this.comment.open = !this.comment.open;
  }
}
