import { BusinessDayCounter } from "./business-day-counter";
import { FixedHoliday } from "./holiday-rules/fixed-holiday";
import { HolidayRule } from "./holiday-rules/holiday-rule";
import { OccurrenceHoliday } from "./holiday-rules/occurrence-holiday";
import { ShiftedHoliday } from "./holiday-rules/shifted-holiday";

describe("BusinessDayCounter", () => {
  let businessDayCounter: BusinessDayCounter;

  beforeEach(() => {
    businessDayCounter = new BusinessDayCounter();
  });

  it("should return 0 if secondDate is equal to or before firstDate", () => {
    const firstDate = new Date("2023-10-10");
    const secondDate = new Date("2023-10-10");
    const holidays: HolidayRule[] = [];
    expect(
      businessDayCounter.BusinessDaysBetweenTwoDates(
        firstDate,
        secondDate,
        holidays
      )
    ).toBe(0);
  });

  it("should return correct business days excluding weekends", () => {
    const firstDate = new Date("2023-10-09"); // Monday
    const secondDate = new Date("2023-10-16"); // Monday
    const holidays: HolidayRule[] = [];

    // Weekdays: 10/10, 10/11, 10/12, 10/13
    expect(
      businessDayCounter.BusinessDaysBetweenTwoDates(
        firstDate,
        secondDate,
        holidays
      )
    ).toBe(4);
  });

  it("should return correct business days excluding weekends and fixed holidays", () => {
    const firstDate = new Date("2023-12-20"); // Wednesday
    const secondDate = new Date("2023-12-29"); // Friday
    const holidays: HolidayRule[] = [
      new FixedHoliday(25, 11), // December 25th
    ];

    // Weekdays between these dates: 21 (Thu), 22 (Fri), 26 (Tue), 27 (Wed), 28 (Thu)
    // December 25th (Mon) is a holiday
    expect(
      businessDayCounter.BusinessDaysBetweenTwoDates(
        firstDate,
        secondDate,
        holidays
      )
    ).toBe(5);
  });

  it("should return correct business days excluding weekends and shifted holidays", () => {
    const firstDate = new Date("2022-12-30"); // Friday
    const secondDate = new Date("2023-01-04"); // Wednesday
    const holidays: HolidayRule[] = [
      new ShiftedHoliday(1, 0), // January 1st, which falls on a Sunday in 2023, shifted to Monday (Jan 2, 2023)
    ];

    // Business days between the dates excluding Jan 1st (Sunday) and Jan 2nd (shifted holiday, Monday):
    // Only 2023-01-03 (Tuesday) should be counted.
    expect(
      businessDayCounter.BusinessDaysBetweenTwoDates(
        firstDate,
        secondDate,
        holidays
      )
    ).toBe(1);
  });

  it("should return correct business days excluding weekends and occurrence holidays", () => {
    const firstDate = new Date("2023-06-01"); // Thursday
    const secondDate = new Date("2023-06-16"); // Friday
    const holidays: HolidayRule[] = [
      new OccurrenceHoliday(1, 2, 5), // Second Monday in June (June 12, 2023)
    ];

    // Weekdays between June 1st and June 16th excluding June 12th (Second Monday in June):
    // 1st (Thu), 2nd (Fri), 5th (Mon), 6th (Tue), 7th (Wed), 8th (Thu), 9th (Fri), 13th (Tue),
    // 14th (Wed), 15th (Thu), 16th (Fri)
    expect(
      businessDayCounter.BusinessDaysBetweenTwoDates(
        firstDate,
        secondDate,
        holidays
      )
    ).toBe(9);
  });

  it("should return correct business days with multiple holiday rules", () => {
    const firstDate = new Date("2023-12-20"); // Wednesday
    const secondDate = new Date("2023-12-29"); // Friday
    const holidays: HolidayRule[] = [
      new FixedHoliday(25, 11), // December 25th
      new ShiftedHoliday(26, 11), // Boxing Day, December 26th, shifted if needed
      new OccurrenceHoliday(3, 4, 11), // fourth Thursday in December (December 27th, 2023)
    ];

    // Weekdays between these dates excluding December 25th (Monday), December 26th (Tuesday), December 27th, 2023 (Wednesday):
    // 20th (Wed), 21st (Thu), 22nd (Fri), 28th (Thu), 29th (Fri)
    expect(
      businessDayCounter.BusinessDaysBetweenTwoDates(
        firstDate,
        secondDate,
        holidays
      )
    ).toBe(3);
  });
});
