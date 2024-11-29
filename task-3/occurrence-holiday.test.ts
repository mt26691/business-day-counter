import { OccurrenceHoliday } from "./occurrence-holiday";

describe("OccurrenceHoliday", () => {
  it("should return true if the date is the specified occurrence of the day of the week in the month", () => {
    const holiday = new OccurrenceHoliday(1, 2, 5); // Second Monday in June (month is zero-based, so 5 is June)
    const testDate = new Date(2023, 5, 12); // June 12, 2023 (Second Monday)
    expect(holiday.isHoliday(testDate)).toBe(true);
  });

  it("should return false if the date is the correct day of the week but not the correct occurrence", () => {
    const holiday = new OccurrenceHoliday(1, 2, 5); // Second Monday in June
    const testDate = new Date(2023, 5, 5); // June 5, 2023 (First Monday)
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return false if the date is the correct occurrence but incorrect day of the week", () => {
    const holiday = new OccurrenceHoliday(1, 2, 5); // Second Monday in June
    const testDate = new Date(2023, 5, 13); // June 13, 2023 (Tuesday)
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return false if the date is in the wrong month", () => {
    const holiday = new OccurrenceHoliday(1, 2, 5); // Second Monday in June
    const testDate = new Date(2023, 4, 8); // May 8, 2023 (Monday)
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return true if the occurrence falls at the end of the month", () => {
    const holiday = new OccurrenceHoliday(5, 5, 8); // Fifth Friday in September (month is zero-based, so 8 is September)
    const testDate = new Date(2023, 8, 29); // September 29, 2023 (Fifth Friday)
    expect(holiday.isHoliday(testDate)).toBe(true);
  });

  it("should return false if the occurrence exceeds the number of available days in the month", () => {
    const holiday = new OccurrenceHoliday(5, 5, 1); // Fifth Friday in February
    const testDate = new Date(2023, 1, 24); // February 24, 2023 (Fourth Friday, since there is no fifth Friday)
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return true for a holiday on the first occurrence of the specified day of the week in a month", () => {
    const holiday = new OccurrenceHoliday(3, 1, 10); // First Wednesday in November (month is zero-based, so 10 is November)
    const testDate = new Date(2023, 10, 1); // November 1, 2023 (First Wednesday)
    expect(holiday.isHoliday(testDate)).toBe(true);
  });
});
