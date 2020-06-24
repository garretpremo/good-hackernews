import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
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

  commentsHiddenText = '+';

  constructor() {
  }

  ngOnInit() {
    if (this.comment?.kids) {
      this.commentsHiddenText = `${1 + this.comment.subComments} more`;
    }
  }

  toggleShowComments() {
    this.comment.open = !this.comment.open;
  }
}
