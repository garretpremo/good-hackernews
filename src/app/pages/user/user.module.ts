import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserSubmissionsComponent } from './user-submissions/user-submissions.component';
import { StoryListModule } from '../../shared-lazy/story-list/story-list.module';
import { UserSubmissionsService } from './user-submissions/user-submissions.service';
import { UserService } from './user.service';

@NgModule({
  declarations: [ UserComponent, UserSubmissionsComponent ],
  imports: [
    SharedModule,
    UserRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    StoryListModule,
  ],
  exports: [
    UserRoutingModule,
  ],
  providers: [
    UserService,
    UserSubmissionsService
  ]
})
export class UserModule {
}
