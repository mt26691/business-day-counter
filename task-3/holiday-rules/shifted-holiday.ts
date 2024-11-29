import { addDays, getDay, isSameDay } from "date-fns";
import { HolidayRule } from "./holiday-rule";

export class ShiftedHoliday implements HolidayRule {
  constructor(private day: number, private month: number) {}

  isHoliday(date: Date): boolean {
    let holiday = new Date(date.getFullYear(), this.month, this.day);

    // If the holiday falls on a Sunday, observe it on the following Monday
    if (getDay(holiday) === 0) {
      holiday = addDays(holiday, 1);
    }
    // If the holiday falls on a Saturday, observe it on the following Monday
    else if (getDay(holiday) === 6) {
      holiday = addDays(holiday, 2);
    }

    return isSameDay(holiday, date);
  }
}
