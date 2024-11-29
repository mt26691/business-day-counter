import { FixedHoliday } from "./fixed-holiday";

describe("FixedHoliday", () => {
  it("should return true if the date is the specified fixed holiday", () => {
    const holiday = new FixedHoliday(25, 11); // December 25th (month is zero-based, so 11 is December)
    const testDate = new Date(2023, 11, 25); // December 25, 2023
    expect(holiday.isHoliday(testDate)).toBe(true);
  });

  it("should return false if the date is the correct day but incorrect month", () => {
    const holiday = new FixedHoliday(25, 11); // December 25th
    const testDate = new Date(2023, 10, 25); // November 25, 2023
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return false if the date is the correct month but incorrect day", () => {
    const holiday = new FixedHoliday(25, 11); // December 25th
    const testDate = new Date(2023, 11, 24); // December 24, 2023
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return false if both day and month do not match the fixed holiday", () => {
    const holiday = new FixedHoliday(25, 11); // December 25th
    const testDate = new Date(2023, 10, 24); // November 24, 2023
    expect(holiday.isHoliday(testDate)).toBe(false);
  });

  it("should return true for a leap year fixed holiday", () => {
    const holiday = new FixedHoliday(29, 1); // February 29th
    const testDate = new Date(2024, 1, 29); // February 29, 2024 (leap year)
    expect(holiday.isHoliday(testDate)).toBe(true);
  });

  it("should return false for a non-leap year fixed holiday", () => {
    const holiday = new FixedHoliday(29, 1); // February 29th
    const testDate = new Date(2023, 1, 29); // February 29, 2023 (not a leap year)
    expect(holiday.isHoliday(testDate)).toBe(false);
  });
});
