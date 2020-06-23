import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserApiService } from '../../service/user-api.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  private readonly userSubject = new BehaviorSubject<User>(null);
  readonly user$ = this.userSubject.asObservable();
  constructor(private route: ActivatedRoute,
              private userApiService: UserApiService) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.userApiService.fetchUser(params.get('id'))
        .subscribe(user => this.user = user);
    }
  }

  get user(): User {
    return this.userSubject.getValue();
  }

  set user(user: User) {
    this.userSubject.next(user);
  }

}
