import { ShiftedHoliday } from "./shifted-holiday";
import { addDays } from "date-fns";

describe("ShiftedHoliday", () => {
  it("should return true if the holiday falls on the specified date and it's a weekday", () => {
    const holiday = new ShiftedHoliday(25, 11); // December 25th
    const testDate = new Date(2023, 11, 25); // December 25, 2023 (Monday)
    expect(holiday.isHoliday(testDate)).toBe(true);
  });

  it("should return true if the holiday falls on a Saturday and is observed on the following Monday", () => {
    const holiday = new ShiftedHoliday(1, 0); // January 1st
    const holidayDate = new Date(2022, 0, 1); // January 1, 2022 (Saturday)
    const observedHolidayDate = addDays(holidayDate, 2); // Observed on January 3, 2022 (Monday)
    expect(holiday.isHoliday(observedHolidayDate)).toBe(true);
  });

  it("should return true if the holiday falls on a Sunday and is observed on the following Monday", () => {
    const holiday = new ShiftedHoliday(1, 4); // May 1st
    const holidayDate = new Date(2022, 4, 1); // May 1, 2022 (Sunday)
    const observedHolidayDate = addDays(holidayDate, 1); // Observed on May 2, 2022 (Monday)
    expect(holiday.isHoliday(observedHolidayDate)).toBe(true);
  });

  it("should return false if the date is not the holiday or its observed date", () => {
    const holiday = new ShiftedHoliday(25, 11); // December 25th
    const testDate = new Date(2023, 11, 26); // December 26, 2023
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return true for holidays shifted from Saturday to Monday, but false for the original Saturday", () => {
    const holiday = new ShiftedHoliday(4, 6); // July 4th
    const originalHolidayDate = new Date(2026, 6, 4); // July 4, 2026 (Saturday)
    const observedHolidayDate = addDays(originalHolidayDate, 2); // Observed on July 6, 2026 (Monday)

    expect(holiday.isHoliday(originalHolidayDate)).toBe(false); // Saturday should not be treated as a holiday
    expect(holiday.isHoliday(observedHolidayDate)).toBe(true); // Monday should be observed as the holiday
  });

  it("should return true for holidays shifted from Sunday to Monday, but false for the original Sunday", () => {
    const holiday = new ShiftedHoliday(1, 0); // January 1st
    const originalHolidayDate = new Date(2023, 0, 1); // January 1, 2023 (Sunday)
    const observedHolidayDate = addDays(originalHolidayDate, 1); // Observed on January 2, 2023 (Monday)

    expect(holiday.isHoliday(originalHolidayDate)).toBe(false); // Sunday should not be treated as a holiday
    expect(holiday.isHoliday(observedHolidayDate)).toBe(true); // Monday should be observed as the holiday
  });

  it("should correctly handle holidays that do not fall on weekends", () => {
    const holiday = new ShiftedHoliday(14, 6); // July 14th
    const holidayDate = new Date(2023, 6, 14); // July 14, 2023 (Friday)
    expect(holiday.isHoliday(holidayDate)).toBe(true);
  });
});
