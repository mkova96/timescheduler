import { Pipe, Inject, LOCALE_ID, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: "date"
})
export class ExtendDatePipe extends DatePipe implements PipeTransform {
  readonly customFormats = {
    dateMonthYear: "dd.MM.y.",
  };

  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(
    value: any,
    format = "dateMonthYear",
    timezone?: string,
    locale?: string
  ): string {
    format = this.customFormats[format] || format;

    return super.transform(value, format, timezone, locale);
  }
}
