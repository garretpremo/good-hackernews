import axios from 'axios';
import { AppComment } from './comment.model';

export class CommentService {
  static readonly url = 'https://hacker-news.firebaseio.com/v0';

  // @Deprecated
  static getComments(ids: number[]): Promise<AppComment[]> {
    return Promise.all(ids.map(id => this.getCommentById(id)));
  }

  // @Deprecated
  static getCommentById(id: number): Promise<AppComment> {
    return axios.get<AppComment>(`${this.url}/item/${ id }.json`)
      .then<AppComment>(response => response.data)
      .then(comment => {
        comment.kids = comment.kids ?? [];
        comment.subCommentCount = 0;

        if (comment.kids.length > 0) {
          return this.getComments(comment.kids).then(subComments => {
            comment.subComments = subComments;

            // @ts-ignore
            subComments.forEach(subComment => comment.subCommentCount += subComment.by ? (subComment.subCommentCount + 1) : 0);

            return comment;
          });
        } else {
          comment.subComments = [];
        }

        return comment;
      });
  }
}
