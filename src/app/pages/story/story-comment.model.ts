import { ItemType } from '../../shared/models/item-type.enum';
import { BehaviorSubject } from 'rxjs';

export class StoryComment {
  readonly type = ItemType.COMMENT;

  private readonly subCommentsSubject = new BehaviorSubject<StoryComment[]>(null);
  readonly subComments$ = this.subCommentsSubject.asObservable();

  children?: StoryComment[];

  open = true;
  deleted: boolean;
  constructor(public by: string,
              public id: number,
              public kids: number[],
              public parent: number,
              public text: string,
              public time: number,
              public subCommentCount = 0) {
  }

  public static fromApi(storyComment: StoryComment): StoryComment {
    if (storyComment === null || storyComment.deleted) {
      return new StoryComment(null, null, null, null, '', 0);
    }

    const { by, id, kids, parent, text, time, children } = storyComment;

    return new StoryComment(by, id, kids, parent, text, time * 1000);
  }

  get subComments(): StoryComment[] {
    return this.subCommentsSubject.getValue();
  }

  set subComments(subComments: StoryComment[]) {
    this.subCommentsSubject.next(subComments);
  }
}
