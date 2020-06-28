import { ItemType } from './item-type.enum';
import { Item } from './item.model';

export class Story extends Item {
  readonly type = ItemType.STORY;

  // userColor: number;

  constructor(id: number,
              by: string,
              time: number,
              kids: number[],
              public descendants: number,
              public score: number,
              public title: string,
              public text?: string,
              public url?: string) {
    super(id, by, time, kids);
  }

  public static fromApi(story: Story) {
    const { id, by, descendants, score, title, text, url } = story;

    if (!id) {
      return new Story(null, null, null, null, null, null, '', '', null);
    }

    const time = story.time ? story.time * 1000 : story.time;
    const kids = story.kids ?? [];

    return new Story(id, by, time, kids, descendants, score, title, text, url);
  }
}
