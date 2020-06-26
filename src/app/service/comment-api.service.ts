import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { StoryComment } from '../pages/story/story-comment.model';
import { map, mergeMap, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommentApiService {

  private readonly url = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {
  }

  getComments(ids: number[]): Observable<StoryComment[]> {
    return combineLatest(ids.map(id => this.getById(id)));
  }

  getById(id: number): Observable<StoryComment> {
    return this.http.get<StoryComment>(`${this.url}/item/${ id }.json`)
      .pipe(
        map(comment => StoryComment.fromApi(comment)),
        tap(comment => {
          if (comment?.kids) {
            this.getComments(comment.kids).subscribe(subComments => {
              subComments.forEach(subComment => comment.subCommentCount += subComment.by ? (subComment.subCommentCount + 1) : 0);
              comment.subComments = subComments;
            });
          } else {
            comment.subComments = [];
          }

          return of(comment);
        })
      );
  }
}
