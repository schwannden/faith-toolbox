import { TOTAL_CHAPTERS, BIBLE_BOOKS, BookInfo } from "./bookMeta";
import { DayReading, generateReadingPlan } from "./utils";

/**
 * Shuffle an array in place (Fisher-Yates Shuffle).
 */
export function shuffleArray<T>(array: T[]): T[] {
  let m = array.length;
  while (m > 0) {
    const i = Math.floor(Math.random() * m--);
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
}

describe("generateReadingPlan", () => {
  it("should generate a reading plan for a non-leap year", () => {
    const year = 2023; // Non-leap year
    const plan: DayReading[] = generateReadingPlan(year);
    const days = 365;

    expect(plan.length).toBe(days);
    const chaptersInPlan = plan
      .map((dailyPlan) => dailyPlan.scope.chapters.length)
      .reduce((a, b) => a + b, 0);
    expect(chaptersInPlan).toBe(TOTAL_CHAPTERS);
    for (const day of plan) {
      if (day.scope.chapters.length === 1) {
        expect(day.readableScope()).toMatch(/\d+/);
      } else {
        expect(day.readableScope()).toMatch(/\d+-\d+/);
      }
    }
  });

  it("should generate a reading plan for a leap year", () => {
    const year = 2024; // Leap year
    const plan = generateReadingPlan(year);
    const days = 366;

    expect(plan.length).toBe(days);
    const chaptersInPlan = plan
      .map((dailyPlan) => dailyPlan.scope.chapters.length)
      .reduce((a, b) => a + b, 0);
    expect(chaptersInPlan).toBe(TOTAL_CHAPTERS);
  });

  it("should generate a reading plan respecting given sequence of books", () => {
    const year = 2023;
    const sequenceOfBooks = shuffleArray(Object.keys(BookInfo).slice());
    const plan = generateReadingPlan(year, sequenceOfBooks);
    expect(plan.length).toBe(365);
    for (const day of plan) {
      expect(BIBLE_BOOKS.indexOf(day.scope.book)).toBeGreaterThan(-1);
    }
  });
});
