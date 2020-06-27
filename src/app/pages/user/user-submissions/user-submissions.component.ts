import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from '../../../shared/models/story.model';
import { Title } from '@angular/platform-browser';
import { UserSubmissionsService } from './user-submissions.service';

@Component({
  selector: 'user-submissions',
  template: '<story-list [stories$]="stories$"></story-list>',
  styleUrls: ['./user-submissions.component.scss']
})
export class UserSubmissionsComponent implements OnInit {

  stories$: Observable<Story[]>;

  constructor(private titleService: Title,
              private userSubmissionsService: UserSubmissionsService) { }

  ngOnInit() {
    this.stories$ = this.userSubmissionsService.stories$;
  }

}
