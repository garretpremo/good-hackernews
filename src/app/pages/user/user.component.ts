import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { PageComponent } from '../page.component';
import { filter, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { UserService } from './user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends PageComponent implements OnInit, OnDestroy {

  user$: Observable<User>;

  subscriptions = new SubSink();

  constructor(titleService: Title,
              private route: ActivatedRoute,
              private userService: UserService) {
    super(titleService);
  }

  ngOnInit() {
    this.user$ = this.userService.user$;

    const params = this.route.snapshot.paramMap;
    if (params.has('id')) {
      this.userService.fetchUser(params.get('id'));
    }

    this.subscriptions.sink = this.userService.user$
      .pipe(
        tap(() => this.loading = true),
        filter(user => user !== null))
      .subscribe(() => this.loading = false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.userService.user = null;
  }
}
