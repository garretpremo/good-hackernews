import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { StoryComment } from '../pages/story/story-comment.model';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

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
        mergeMap(comment => {
          if (comment?.kids) {
            return this.getComments(comment.kids)
              .pipe(map(subComments => {
                comment.children = subComments;

                subComments.forEach(subComment => {
                  if (subComment.by) {
                    comment.subComments += subComment.subComments + 1;
                  }
                });

                return comment;
              }));
          } else {
            return of(comment);
          }
        })
      );
  }
}
