import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Story } from '../shared/models/story.model';

@Injectable({ providedIn: 'root' })
export class NewsApiService {

  private pageSize = 30;
  private page = 1;
  private readonly url = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {
  }

  getTopStories() {
    return this.http.get<number[]>(`${this.url}/topstories.json`)
      .pipe(switchMap(ids => this.getNewsFromIds(ids)));
  }

  getNewStories() {
    return this.http.get<number[]>(`${this.url}/newstories.json`)
      .pipe(switchMap(ids => this.getNewsFromIds(ids)));
  }

  getBestStories() {
    return this.http.get<number[]>(`${this.url}/beststories.json`)
      .pipe(switchMap(ids => this.getNewsFromIds(ids)));
  }

  getById(storyId: number): Observable<Story> {
    return this.http.get<Story>(`${this.url}/item/${ storyId }.json`)
      .pipe(map(story => Story.fromApi(story)));
  }

  private getNewsFromIds(ids: number[]): Observable<Story[]> {
    return combineLatest(ids
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize)
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
