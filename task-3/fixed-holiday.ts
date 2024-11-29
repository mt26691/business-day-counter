import { getDate, getMonth } from "date-fns";
import { HolidayRule } from "./holiday-rule";

export class FixedHoliday implements HolidayRule {
  constructor(private day: number, private month: number) {}

  isHoliday(date: Date): boolean {
    return getDate(date) === this.day && getMonth(date) === this.month;
  }
}
