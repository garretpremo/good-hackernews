import { NgModule } from '@angular/core';
import { NewStoriesComponent } from './new-stories.component';
import { NewStoriesService } from './new-stories.service';
import { SharedModule } from '../../shared/shared.module';
import { NewStoriesRoutingModule } from './new-stories-routing.module';

@NgModule({
  declarations: [ NewStoriesComponent ],
  imports: [
    SharedModule,
    NewStoriesRoutingModule
  ],
  exports: [ NewStoriesRoutingModule ],
  providers: [ NewStoriesService ]
})
export class NewStoriesModule { }
