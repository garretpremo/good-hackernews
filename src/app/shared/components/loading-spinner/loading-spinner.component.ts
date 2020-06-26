import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
    <mat-spinner [diameter]="50"></mat-spinner>
    <div class="loading-text"><ng-content></ng-content></div>
  `,
  styleUrls: [ './loading-spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
}
