import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserApiService extends ApiService {

  constructor(private http: HttpClient) {
    super();
  }

  fetchUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/${id}.json`)
      .pipe(map(user => User.from(user)));
  }
}
