import { differenceInCalendarDays, addDays, getDay, isSameDay } from "date-fns";
import { HolidayRule } from "./holiday-rules/holiday-rule";

export class BusinessDayCounter {
  BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    holidayRules: HolidayRule[]
  ): number {
    if (secondDate <= firstDate) return 0;

    let count = 0;
    let currentDate = addDays(firstDate, 1); // Exclude firstDate
    const daysBetween = differenceInCalendarDays(secondDate, firstDate);

    for (let i = 1; i < daysBetween; i++) {
      // Exclude weekends
      if (![0, 6].includes(getDay(currentDate))) {
        const isHoliday = holidayRules.some((rule) =>
          rule.isHoliday(currentDate)
        );
        if (!isHoliday) count++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return count;
  }
}
