export const BIBLE_BOOKS = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Solomon",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
];

export type Book = (typeof BIBLE_BOOKS)[number];

export interface DayReading {
  date: string;
  chapters: { book: Book; chapters: number }[];
}

/**
 * Default set of Bible books in canonical order with chapter counts.
 * These counts are fixed: Old Testament (39 books), New Testament (27 books).
 * For simplicity, this list contains all 66 books with their chapters count.
 * Source of chapter counts: widely known Bible structure.
 */
const BookInfo: Record<Book, number> = {
  Genesis: 50,
  Exodus: 40,
  Leviticus: 27,
  Numbers: 36,
  Deuteronomy: 34,
  Joshua: 24,
  Judges: 21,
  Ruth: 4,
  "1 Samuel": 31,
  "2 Samuel": 24,
  "1 Kings": 22,
  "2 Kings": 25,
  "1 Chronicles": 29,
  "2 Chronicles": 36,
  Ezra: 10,
  Nehemiah: 13,
  Esther: 10,
  Job: 42,
  Psalms: 150, // psalm 119 uses special day
  Proverbs: 31,
  Ecclesiastes: 12,
  "Song of Solomon": 8,
  Isaiah: 66,
  Jeremiah: 52,
  Lamentations: 5,
  Ezekiel: 48,
  Daniel: 12,
  Hosea: 14,
  Joel: 3,
  Amos: 9,
  Obadiah: 1,
  Jonah: 4,
  Micah: 7,
  Nahum: 3,
  Habakkuk: 3,
  Zephaniah: 3,
  Haggai: 2,
  Zechariah: 14,
  Malachi: 4,
  Matthew: 28,
  Mark: 16,
  Luke: 24,
  John: 21,
  Acts: 28,
  Romans: 16,
  "1 Corinthians": 16,
  "2 Corinthians": 13,
  Galatians: 6,
  Ephesians: 6,
  Philippians: 4,
  Colossians: 4,
  "1 Thessalonians": 5,
  "2 Thessalonians": 3,
  "1 Timothy": 6,
  "2 Timothy": 4,
  Titus: 3,
  Philemon: 1,
  Hebrews: 13,
  James: 5,
  "1 Peter": 5,
  "2 Peter": 3,
  "1 John": 5,
  "2 John": 1,
  "3 John": 1,
  Jude: 1,
  Revelation: 22,
};

// Total chapters in the Bible
const TOTAL_CHAPTERS = Object.values(BookInfo).reduce(
  (sum, chapters) => sum + chapters,
  0,
); // 1189

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
 * Shuffle an array in place (Fisher-Yates Shuffle).
 */
function shuffleArray<T>(array: T[]): T[] {
  let m = array.length;
  while (m > 0) {
    const i = Math.floor(Math.random() * m--);
    [array[m], array[i]] = [array[i], array[m]];
  }
  return array;
}

/**
 * Generate a yearly reading plan with the given constraints:
 * - Try not to read from more than one book per day.
 * - If a book is too short and doesn't meet the day's approximate target, may start next book.
 * - Psalm 119 should be read alone on a single day.
 *
 * This approach uses the base and remainder logic for chapters per day as a guideline,
 * but will adjust day-by-day to respect book boundaries and special Psalm 119 constraint.
 */
export function generateReadingPlan(
  year: number,
  sequenceOfBooks?: Book[],
): DayReading[] {
  const dates = generateDatesForYear(year);
  const numberOfDays = dates.length;

  const booksInOrder = sequenceOfBooks
    ? sequenceOfBooks.slice()
    : shuffleArray(Object.keys(BookInfo).slice());

  // Flatten chapters
  // We'll keep track of where we are in the reading
  const allChapters: { book: Book; chapter: number }[] = [];
  for (const book of booksInOrder) {
    for (let chapter = 1; chapter <= BookInfo[book]; chapter++) {
      allChapters.push({ book, chapter });
    }
  }

  // We subtract 1 from the total days because we want to leave one day for Psalm 119
  const baseChaptersPerDay = Math.floor(TOTAL_CHAPTERS / (numberOfDays - 1));
  let remainder = TOTAL_CHAPTERS % (numberOfDays - 1);
  let unreadChapters = TOTAL_CHAPTERS;

  let chapterIndex = 0;
  const plan: DayReading[] = [];

  while (chapterIndex < allChapters.length && plan.length < dates.length) {
    const date = dates[plan.length];
    const currentChapter = allChapters[chapterIndex];
    if (currentChapter.book === "Psalms" && currentChapter.chapter === 119) {
      // Psalm 119 is special, we must read it alone
      plan.push({ date, chapters: [{ book: "Psalms", chapters: 119 }] });
      unreadChapters -= 1;
      chapterIndex++;
      continue;
    }

    // Determine today's ideal chapter count
    const chaptersLeftInTheBook =
      BookInfo[currentChapter.book] - currentChapter.chapter;
    let dailyTarget = baseChaptersPerDay;
    if (chaptersLeftInTheBook > dailyTarget && remainder > 0) {
      dailyTarget += 1;
      remainder -= 1;
    }
    dailyTarget = Math.min(dailyTarget, unreadChapters);

    const dayChapters: { book: Book; chapters: number }[] = [];
    for (let i = 0; i < dailyTarget; i++) {
      const ch = allChapters[chapterIndex + i];
      dayChapters.push({ book: ch.book, chapters: ch.chapter });
      unreadChapters -= 1;
    }
    chapterIndex += dailyTarget;
    plan.push({ date, chapters: dayChapters });
  }

  return plan;
}
