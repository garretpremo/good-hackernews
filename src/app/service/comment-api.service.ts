import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { StoryComment } from '../shared/models/story-comment.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CommentApiService {

  private readonly url = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {
  }

  getComments(ids: number[]): Observable<StoryComment[]> {
    return forkJoin(ids.map(id => this.getById(id)));
  }

  getById(id: number): Observable<StoryComment> {
    return this.http.get<StoryComment>(`${this.url}/item/${ id }.json`)
      .pipe(
        map(comment => StoryComment.fromApi(comment)),
        tap(comment => {
          if (comment?.kids?.length > 0) {
            this.getComments(comment.kids).subscribe(subComments => {
              subComments.forEach(subComment => comment.subCommentCount += subComment.by ? (subComment.subCommentCount + 1) : 0);
              comment.subComments = subComments;
            });
          } else {
            comment.subComments = [];
          }
        })
      );
  }
}
