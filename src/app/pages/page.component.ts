import { HostBinding, Directive } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class PageComponent {
  @HostBinding('class.app-page') protected appPage = true;
  @HostBinding('class.loading') protected loading = true;

  protected title: string = null;

  protected constructor(private titleService: Title) {
  }

  setTitle(title = null) {
    if (title !== null) {
      this.title = title;
      this.titleService.setTitle(title);

    } else if (this.title !== null) {
      this.titleService.setTitle(this.title);
    }
  }
}
