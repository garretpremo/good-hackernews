import axios from 'axios';
import { Story } from './story.model';

export class StoryService {
  static readonly url = 'https://hacker-news.firebaseio.com/v0';

  static getStoryById(id: number): Promise<Story> {
    return axios.get<Story>(`${this.url}/item/${ id }.json`)
      .then<Story>(response => response.data)
      .then(story => {
        story.kids = story.kids ?? [];
        return story;
      });
  }
}
