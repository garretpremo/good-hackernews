import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url'
})

export class UrlPipe implements PipeTransform {
  transform(urlString: string): string {
    let url = null;
    try {
      url = new URL(urlString);
    } catch {
      return '';
    }

    const urlSegments = url.hostname.split('.');

    return `(${urlSegments[urlSegments.length - 2]}.${urlSegments[urlSegments.length - 1]})`;
  }
}
