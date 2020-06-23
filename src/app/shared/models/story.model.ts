import { ItemType } from './item-type.enum';

export class Story {
  type = ItemType.STORY;

  constructor(
    public id: number,
    public by: string,
    public descendants: number,
    public score: number,
    public time: number,
    public title: string,
    public url: string) {
  }

  public static fromApi(story: Story) {
    const { id, by, descendants, score, title, url } = story;
    let time = story.time;

    if (time) {
      time = time * 1000;
    }

    return new Story(id, by, descendants, score, time, title, url);
  }
}
