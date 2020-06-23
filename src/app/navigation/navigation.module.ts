import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ NavigationComponent ],
  imports: [
    RouterModule,
    MatButtonModule
  ],
  exports: [ NavigationComponent ]
})
export class NavigationModule { }
