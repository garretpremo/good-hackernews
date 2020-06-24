import { ItemType } from '../../shared/models/item-type.enum';

export class StoryComment {
  readonly type = ItemType.COMMENT;

  children?: StoryComment[];
  open = true;

  constructor(public by: string,
              public id: number,
              public kids: number[],
              public parent: number,
              public text: string,
              public time: number,
              public subComments = 0) {
  }

  public static fromApi(storyComment: StoryComment): StoryComment {
    const { by, id, kids, parent, text, time, children } = storyComment;

    return new StoryComment(by, id, kids, parent, text, time * 1000);
  }
}
