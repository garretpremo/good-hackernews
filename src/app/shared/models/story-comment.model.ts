import { ItemType } from './item-type.enum';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';

export class StoryComment extends Item {
  readonly type = ItemType.COMMENT;

  private readonly subCommentsSubject = new BehaviorSubject<StoryComment[]>(null);
  readonly subComments$ = this.subCommentsSubject.asObservable();

  children?: StoryComment[];
  open = true;
  deleted: boolean;

  constructor(id: number,
              by: string,
              time: number,
              kids: number[],
              public parent: number,
              public text: string,
              public subCommentCount = 0) {
    super(id, by, time, kids);
  }

  public static fromApi(storyComment: StoryComment): StoryComment {
    if (storyComment === null || storyComment.deleted) {
      return new StoryComment(null, null, null, [], null, '');
    }

    const { by, id, parent, text, children } = storyComment;

    const time = storyComment.time ? storyComment.time * 1000 : storyComment.time;
    const kids = storyComment.kids ?? [];

    return new StoryComment(id, by, time, kids, parent, text);
  }

  get subComments(): StoryComment[] {
    return this.subCommentsSubject.getValue();
  }

  set subComments(subComments: StoryComment[]) {
    this.subCommentsSubject.next(subComments);
  }
}
