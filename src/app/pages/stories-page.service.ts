import { Story } from '../shared/models/story.model';
import { BehaviorSubject } from 'rxjs';

export abstract class StoriesPageService {
  private readonly storiesSubject = new BehaviorSubject<Story[]>(null);
  readonly stories$ = this.storiesSubject.asObservable();

  get stories(): Story[] {
      return this.storiesSubject.getValue();
  }

  set stories(stories: Story[]) {
      this.storiesSubject.next(stories);
  }
}
