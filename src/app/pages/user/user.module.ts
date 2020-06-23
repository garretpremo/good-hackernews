import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ UserComponent ],
  imports: [
    SharedModule,
    UserRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    UserRoutingModule,
  ]
})
export class UserModule {
}
