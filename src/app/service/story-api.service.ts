import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Story } from '../shared/models/story.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class StoryApiService extends ApiService {

  private pageSize = 30;
  private page = 1;

  constructor(private http: HttpClient) {
    super();
  }

  getTopStories() {
    return this.http.get<number[]>(`${this.url}/topstories.json`)
      .pipe(switchMap(ids => this.getStoriesFromIds(ids)));
  }

  getNewStories() {
    return this.http.get<number[]>(`${this.url}/newstories.json`)
      .pipe(switchMap(ids => this.getStoriesFromIds(ids)));
  }

  getBestStories() {
    return this.http.get<number[]>(`${this.url}/beststories.json`)
      .pipe(switchMap(ids => this.getStoriesFromIds(ids)));
  }

  getById(storyId: number): Observable<Story> {
    return this.http.get<Story>(`${this.url}/item/${ storyId }.json`)
      .pipe(map(story => Story.fromApi(story)));
  }

  getStoriesFromIds(ids: number[], page = 1, pageSize = 30): Observable<Story[]> {
    return combineLatest(ids
      .slice((page - 1) * pageSize, page * pageSize)
      .map(id => this.getById(id))
    );
  }

  private getNewsFromMax(maxId: number): Observable<Story[]> {
    const news$: Observable<Story>[] = [];

    for (let i = 0; i < this.pageSize; i++) {
      news$.push(this.getById(maxId--));
    }

    return combineLatest(news$);
  }
}
