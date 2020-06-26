import { ItemType } from './item-type.enum';

export class Story {
  type = ItemType.STORY;

  // userColor: number;

  constructor(
    public id: number,
    public by: string,
    public descendants: number,
    public score: number,
    public time: number,
    public title: string,
    public kids?: number[],
    public text?: string,
    public url?: string) {
  }

  public static fromApi(story: Story) {
    const { id, by, descendants, score, title, kids, text, url } = story;
    let time = story.time;

    if (time) {
      time = time * 1000;
    }

    return new Story(id, by, descendants, score, time, title, kids, text, url);
  }
}
