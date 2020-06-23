import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Story } from '../../../models/story.model';

@Component({
  selector: 'story-list-story',
  templateUrl: './story-list-story.component.html',
  styleUrls: ['./story-list-story.component.scss', './story-info.scss']
})
export class StoryListStoryComponent implements OnInit {

  @Input()
  story: Story;

  @Input()
  index: number;

  hovering = false;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.hovering = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hovering = false;
  }

  goToComments(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
