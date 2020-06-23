import { Injectable } from '@angular/core';
import { Story } from '../../shared/models/story.model';
import { BehaviorSubject } from 'rxjs';
import { NewsApiService } from '../../service/news-api.service';

@Injectable()
export class StoryService {

  private readonly storySubject = new BehaviorSubject<Story>(null);
  readonly story$ = this.storySubject.asObservable();

  constructor(private newsApiService: NewsApiService) {
  }

  fetchStory(id: number) {
    this.newsApiService.getById(id).subscribe(story => this.story = story);
  }

  get story(): Story {
    return this.storySubject.getValue();
  }

  set story(story: Story) {
    this.storySubject.next(story);
  }
}
