import { Injectable } from '@angular/core';
import { Story } from '../../shared/models/story.model';
import { BehaviorSubject } from 'rxjs';
import { NewsApiService } from '../../service/news-api.service';
import { StoryComment } from './story-comment.model';
import { CommentApiService } from '../../service/comment-api.service';

@Injectable()
export class StoryService {

  private readonly storySubject = new BehaviorSubject<Story>(null);
  readonly story$ = this.storySubject.asObservable();

  private readonly commentsSubject = new BehaviorSubject<StoryComment[]>(null);
  readonly comments$ = this.commentsSubject.asObservable();

  constructor(private newsApiService: NewsApiService,
              private commentApiService: CommentApiService) {
  }

  fetchStory(id: number) {
    this.newsApiService.getById(id).subscribe(story => this.story = story);
  }

  fetchComments() {
    this.commentApiService.getComments(this.story.kids).subscribe(comments => this.comments = comments);
  }

  get story(): Story {
    return this.storySubject.getValue();
  }

  set story(story: Story) {
    this.storySubject.next(story);
  }

  get comments(): StoryComment[] {
    return this.commentsSubject.getValue();
  }

  set comments(comments: StoryComment[]) {
    this.commentsSubject.next(comments);
  }
}
