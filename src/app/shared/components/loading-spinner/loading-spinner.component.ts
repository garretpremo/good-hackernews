import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'loading-spinner',
  template: `
    <mat-spinner [diameter]="diameter"></mat-spinner>
    <div class="loading-text"><ng-content></ng-content></div>
  `,
  styleUrls: [ './loading-spinner.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  @Input()
  diameter = 50;
}
