import { BusinessDayCounter } from "./business-day-counter";

describe("BusinessDayCounter", () => {
  let counter: BusinessDayCounter;

  beforeEach(() => {
    counter = new BusinessDayCounter();
  });

  it("should return 0 if secondDate is equal to or before firstDate", () => {
    const firstDate = new Date("2023-10-10");
    const secondDate = new Date("2023-10-10");
    expect(counter.WeekdaysBetweenTwoDates(firstDate, secondDate)).toBe(0);
    expect(counter.BusinessDaysBetweenTwoDates(firstDate, secondDate, [])).toBe(
      0
    );
  });

  it("should return the correct number of weekdays between two dates", () => {
    const firstDate1 = new Date("2013-10-07"); // Monday
    const secondDate1 = new Date("2013-10-09"); // Wednesday
    expect(counter.WeekdaysBetweenTwoDates(firstDate1, secondDate1)).toBe(1);

    const firstDate2 = new Date("2013-10-05"); // Saturday
    const secondDate2 = new Date("2013-10-14"); // Monday
    expect(counter.WeekdaysBetweenTwoDates(firstDate2, secondDate2)).toBe(5);

    const firstDate3 = new Date("2013-10-07"); // Monday
    const secondDate3 = new Date("2014-01-01"); // Wednesday
    expect(counter.WeekdaysBetweenTwoDates(firstDate3, secondDate3)).toBe(61);

    const firstDate4 = new Date("2013-10-07"); // Monday
    const secondDate4 = new Date("2013-10-05"); // Saturday
    expect(counter.WeekdaysBetweenTwoDates(firstDate4, secondDate4)).toBe(0);
  });

  it("should return the correct number of business days between two dates excluding public holidays", () => {
    const firstDate = new Date("2023-10-09"); // Monday
    const secondDate = new Date("2023-10-13"); // Friday
    const publicHolidays = [new Date("2023-10-11")]; // Wednesday
    expect(
      counter.BusinessDaysBetweenTwoDates(firstDate, secondDate, publicHolidays)
    ).toBe(2);
  });

  it("should return the correct number of business days when there are no public holidays", () => {
    const firstDate = new Date("2023-10-09"); // Monday
    const secondDate = new Date("2023-10-13"); // Friday
    expect(counter.BusinessDaysBetweenTwoDates(firstDate, secondDate, [])).toBe(
      3
    );
  });

  it("should handle cases where the date range includes weekends", () => {
    const firstDate = new Date("2023-10-06"); // Friday
    const secondDate = new Date("2023-10-16"); // Monday
    expect(counter.WeekdaysBetweenTwoDates(firstDate, secondDate)).toBe(5);
    const publicHolidays = [new Date("2023-10-11")]; // Wednesday
    expect(
      counter.BusinessDaysBetweenTwoDates(firstDate, secondDate, publicHolidays)
    ).toBe(4);
  });

  it("should return the correct number of business days between two dates with given public holidays", () => {
    const publicHolidays = [
      new Date("2013-12-25"), // 25th December 2013
      new Date("2013-12-26"), // 26th December 2013
      new Date("2014-01-01"), // 1st January 2014
    ];

    const firstDate1 = new Date("2013-10-07"); // Monday
    const secondDate1 = new Date("2013-10-09"); // Wednesday
    expect(
      counter.BusinessDaysBetweenTwoDates(
        firstDate1,
        secondDate1,
        publicHolidays
      )
    ).toBe(1);

    const firstDate2 = new Date("2013-12-24"); // Tuesday
    const secondDate2 = new Date("2013-12-27"); // Friday
    expect(
      counter.BusinessDaysBetweenTwoDates(
        firstDate2,
        secondDate2,
        publicHolidays
      )
    ).toBe(0);

    const firstDate3 = new Date("2013-10-07"); // Monday
    const secondDate3 = new Date("2014-01-01"); // Wednesday
    expect(
      counter.BusinessDaysBetweenTwoDates(
        firstDate3,
        secondDate3,
        publicHolidays
      )
    ).toBe(59);
  });
});
