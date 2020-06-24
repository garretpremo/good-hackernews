import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserApiService {

  constructor(private http: HttpClient) {
  }

  fetchUser(id: string): Observable<User> {
    return this.http.get<User>(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
      .pipe(map(user => User.from(user)));
  }
}
