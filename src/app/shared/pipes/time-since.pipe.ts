import { Pipe, PipeTransform } from '@angular/core';

enum TimeType {
  SECOND = 'second',
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day'
}

@Pipe({ name: 'timeSince' })
export class TimeSincePipe implements PipeTransform {

  transform(time: number): string {
    const now = Date.now();

    const milliseconds = now - time;
    const seconds = Math.ceil(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      if (seconds <= 0) {
        return '0 seconds ago';
      } else {
        return this.getTimeSince(seconds, TimeType.SECOND);
      }
    } else if (minutes < 60) {
      return this.getTimeSince(minutes, TimeType.MINUTE);
    } else if (hours < 24) {
      return this.getTimeSince(hours, TimeType.HOUR);
    } else {
      return this.getTimeSince(days, TimeType.DAY);
    }
  }

  getTimeSince(timeValue: number, timeType: TimeType) {
    const plural = timeValue !== 1 ? 's' : '';
    return `${timeValue} ${timeType}${plural} ago`;
  }
}
