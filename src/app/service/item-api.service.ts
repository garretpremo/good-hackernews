import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';
import { Story } from '../shared/models/story.model';
import { Item } from '../shared/models/item.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ItemType } from '../shared/models/item-type.enum';
import { StoryComment } from '../shared/models/story-comment.model';

@Injectable({ providedIn: 'root' })
export class ItemApiService extends ApiService{

  constructor(private http: HttpClient) {
    super();
  }

  getStories(ids: number[], page = 1, pageSize = 30): Observable<Story[]> {
    return this.getItemsFromIds(ids).pipe(
      map(items => items.filter(item => item instanceof Story))
    ) as Observable<Story[]>;
  }

  getItemsFromIds(ids: number[], page = 1, pageSize = 30): Observable<Item[]> {
    return combineLatest(ids
      .slice((page - 1) * pageSize, page * pageSize)
      .map(id => this.getById(id))
    );
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.url}/item/${id}.json`)
      .pipe(map(item => {
        switch (item.type) {
          case ItemType.STORY:
            return Story.fromApi(item as Story);
          case ItemType.COMMENT:
            return StoryComment.fromApi(item as StoryComment);
        }
      }));
  }

  // getOnePageCommentsAndOnePageStories(ids: number[], from = 0): Observable<{ stories: Story[], comments: Comment[] }> {
  //   const data = { stories: [], comments: [] };
  // }
}
