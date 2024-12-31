import { BIBLE_BOOKS, Book, BookInfo } from "./bookMeta";

export class ReadingScope {
  book: Book;
  chapters: number[];

  constructor(book: Book, chapters: number[]) {
    this.book = book;
    this.chapters = chapters;
  }
}

export class DayReading {
  date: string;
  scope: ReadingScope;

  constructor(date: string, scope: ReadingScope) {
    this.date = date;
    this.scope = scope;
  }

  readableScope(): string {
    if (this.scope.chapters.length === 1) {
      return `${this.scope.chapters[0]}`;
    }
    return `${this.scope.chapters[0]}-${this.scope.chapters[this.scope.chapters.length - 1]}`;
  }
}

export function getDailyPlans(
  book: Book,
  isLeapYear: boolean = false,
): ReadingScope[] {
  const bookInfo = BookInfo[book];
  let splits = [...bookInfo.splits, bookInfo.chapters + 1];
  if (isLeapYear && book === "Matt") {
    // if it is leap year, spend more time reading the sermon on the mountain
    splits = [1, 4, 6, 8, 10, 13, 17, 20, 24, 29];
  }
  const results: ReadingScope[] = [];
  for (let i = 0; i < splits.length - 1; i++) {
    const length = splits[i + 1] - splits[i];
    const chapters = Array.from({ length }, (_, index) => splits[i] + index);
    results.push(new ReadingScope(book, chapters));
  }
  return results;
}

/**
 * Generate all dates for a given year.
 */
function generateDatesForYear(year: number): string[] {
  const dates: string[] = [];
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    dates.push(`${yyyy}-${mm}-${dd}`);
  }

  return dates;
}

/**
 * Generate a yearly reading plan with the given constraints:
 * - Don't read from more than one book per day.
 * - Psalm 119 should be read alone on a single day.
 */
export function generateReadingPlan(
  year: number,
  sequenceOfBooks?: Book[],
): DayReading[] {
  const dates = generateDatesForYear(year);
  const numberOfDays = dates.length;
  const isLeapYear = numberOfDays === 366;

  const booksInOrder = sequenceOfBooks ? sequenceOfBooks.slice() : BIBLE_BOOKS;

  const readingScopes: ReadingScope[] = booksInOrder.flatMap((book) =>
    getDailyPlans(book, isLeapYear),
  );

  // zip the dates and reading scopes and generate the reading plan
  const readingPlan: DayReading[] = dates.map(
    (date, index) => new DayReading(date, readingScopes[index]),
  );
  return readingPlan;
}
