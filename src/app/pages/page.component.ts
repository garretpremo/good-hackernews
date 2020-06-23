import { HostBinding } from '@angular/core';

export abstract class PageComponent {
  @HostBinding('class.app-page') protected readonly appPage = true;
  @HostBinding('class.loading') protected loading = true;
}
