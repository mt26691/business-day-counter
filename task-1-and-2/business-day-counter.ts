import { differenceInCalendarDays, addDays, getDay, isSameDay } from "date-fns";

export class BusinessDayCounter {
  WeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    if (secondDate <= firstDate) return 0;

    let count = 0;
    let currentDate = addDays(firstDate, 1); // Exclude firstDate
    const daysBetween = differenceInCalendarDays(secondDate, firstDate);

    for (let i = 1; i < daysBetween; i++) {
      if (![0, 6].includes(getDay(currentDate))) {
        // Exclude Sunday (0) and Saturday (6)
        count++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return count;
  }

  BusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[]
  ): number {
    if (secondDate <= firstDate) return 0;

    let count = 0;
    let currentDate = addDays(firstDate, 1); // Exclude firstDate
    const daysBetween = differenceInCalendarDays(secondDate, firstDate);

    for (let i = 1; i < daysBetween; i++) {
      if (![0, 6].includes(getDay(currentDate))) {
        // Exclude weekends
        const isHoliday = publicHolidays.some((holiday) =>
          isSameDay(currentDate, holiday)
        );
        if (!isHoliday) count++;
      }
      currentDate = addDays(currentDate, 1);
    }

    return count;
  }
}
