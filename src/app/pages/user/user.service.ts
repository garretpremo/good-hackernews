import { Injectable } from '@angular/core';
import { UserApiService } from '../../service/user-api.service';
import { User } from '../../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
  private readonly userSubject = new BehaviorSubject<User>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private userApiService: UserApiService) {
  }

  fetchUser(id: string) {
    this.userApiService.fetchUser(id).subscribe(user => this.user = user);
  }

  get user(): User {
    return this.userSubject.getValue();
  }

  set user(user: User) {
    this.userSubject.next(user);
  }
}
