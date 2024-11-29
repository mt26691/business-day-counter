import { isMonday, addDays, getDay, isSameDay } from "date-fns";
import { HolidayRule } from "./holiday-rule";

export class OccurrenceHoliday implements HolidayRule {
  constructor(
    private dayOfWeek: number,
    private occurrence: number,
    private month: number
  ) {}

  isHoliday(date: Date): boolean {
    const firstDayOfMonth = new Date(date.getFullYear(), this.month, 1);
    let dayCount = 0;

    for (let i = 0; i < 31; i++) {
      const current = addDays(firstDayOfMonth, i);
      if (getDay(current) === this.dayOfWeek) dayCount++;
      if (dayCount === this.occurrence && isSameDay(current, date)) return true;
    }

    return false;
  }
}
