import { addDays, getDay, isSameDay, getMonth } from "date-fns";
import { HolidayRule } from "./holiday-rule";

export class OccurrenceHoliday implements HolidayRule {
  constructor(
    private dayOfWeek: number,
    private occurrence: number,
    private month: number
  ) {}

  isHoliday(date: Date): boolean {
    // Ensure we are dealing with the correct month
    if (getMonth(date) !== this.month) {
      return false;
    }

    const firstDayOfMonth = new Date(date.getFullYear(), this.month, 1);
    let dayCount = 0;

    for (let i = 0; i < 31; i++) {
      const current = addDays(firstDayOfMonth, i);

      // Break if we move to the next month
      if (getMonth(current) !== this.month) {
        break;
      }

      if (getDay(current) !== this.dayOfWeek) {
        continue;
      }
      // Check if the current day matches the desired day of the week
      if (getDay(current) === this.dayOfWeek) {
        dayCount++;

        // If we reach the target occurrence and it's the same date, return true
        if (dayCount === this.occurrence && isSameDay(current, date)) {
          return true;
        }
      }
    }

    return false;
  }
}
