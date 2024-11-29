import { addDays, getDay, isMonday, isSameDay } from "date-fns";
import { HolidayRule } from "./holiday-rule";

export class ShiftedHoliday implements HolidayRule {
  constructor(private day: number, private month: number) {}

  isHoliday(date: Date): boolean {
    const holiday = new Date(date.getFullYear(), this.month, this.day);
    if (getDay(holiday) === 0) return isMonday(addDays(holiday, 1)); // Shift Sunday to Monday
    if (getDay(holiday) === 6) return isMonday(addDays(holiday, 2)); // Shift Saturday to Monday
    return isSameDay(holiday, date);
  }
}
