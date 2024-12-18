export const BIBLE_BOOKS = [
  "Gen", // Genesis
  "Exod", // Exodus
  "Lev", // Leviticus
  "Num", // Numbers
  "Deut", // Deuteronomy
  "Josh", // Joshua
  "Judg", // Judges
  "Ruth", // Ruth
  "1Sam", // 1 Samuel
  "2Sam", // 2 Samuel
  "1Kgs", // 1 Kings
  "2Kgs", // 2 Kings
  "1Chr", // 1 Chronicles
  "2Chr", // 2 Chronicles
  "Ezra", // Ezra
  "Neh", // Nehemiah
  "Esth", // Esther
  "Job", // Job
  "Ps", // Psalms
  "Prov", // Proverbs
  "Eccl", // Ecclesiastes
  "Song", // Song of Solomon
  "Isa", // Isaiah
  "Jer", // Jeremiah
  "Lam", // Lamentations
  "Ezek", // Ezekiel
  "Dan", // Daniel
  "Hos", // Hosea
  "Joel", // Joel
  "Amos", // Amos
  "Obad", // Obadiah
  "Jonah", // Jonah
  "Mic", // Micah
  "Nah", // Nahum
  "Hab", // Habakkuk
  "Zeph", // Zephaniah
  "Hag", // Haggai
  "Zech", // Zechariah
  "Mal", // Malachi
  "Matt", // Matthew
  "Mark", // Mark
  "Luke", // Luke
  "John", // John
  "Acts", // Acts
  "Rom", // Romans
  "1Cor", // 1 Corinthians
  "2Cor", // 2 Corinthians
  "Gal", // Galatians
  "Eph", // Ephesians
  "Phil", // Philippians
  "Col", // Colossians
  "1Thess", // 1 Thessalonians
  "2Thess", // 2 Thessalonians
  "1Tim", // 1 Timothy
  "2Tim", // 2 Timothy
  "Titus", // Titus
  "Phlm", // Philemon
  "Heb", // Hebrews
  "Jas", // James
  "1Pet", // 1 Peter
  "2Pet", // 2 Peter
  "1John", // 1 John
  "2John", // 2 John
  "3John", // 3 John
  "Jude", // Jude
  "Rev", // Revelation
];

export type Book = (typeof BIBLE_BOOKS)[number];

export interface BookMeta {
  chapters: number;
  splits: number[];
}

export const BookInfo: Record<Book, BookMeta> = {
  Gen: {
    chapters: 50,
    splits: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 46],
  },
  Exod: {
    chapters: 40,
    splits: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37],
  },
  Lev: {
    chapters: 27,
    splits: [1, 5, 9, 13, 17, 21, 24],
  },
  Num: {
    chapters: 36,
    splits: [1, 5, 9, 13, 17, 21, 25, 29, 33],
  },
  Deut: {
    chapters: 34,
    splits: [1, 5, 9, 13, 17, 21, 25, 29, 33],
  },
  Josh: {
    chapters: 24,
    splits: [1, 5, 9, 13, 17, 21],
  },
  Judg: {
    chapters: 21,
    splits: [1, 5, 9, 13, 17],
  },
  Ruth: {
    chapters: 4,
    splits: [1],
  },
  "1Sam": {
    chapters: 31,
    splits: [1, 5, 9, 13, 17, 21, 25, 29],
  },
  "2Sam": {
    chapters: 24,
    splits: [1, 5, 9, 13, 17, 21],
  },
  "1Kgs": {
    chapters: 22,
    splits: [1, 5, 9, 13, 17, 20],
  },
  "2Kgs": {
    chapters: 25,
    splits: [1, 5, 9, 13, 17, 21],
  },
  "1Chr": {
    chapters: 29,
    splits: [1, 5, 9, 13, 17, 21, 25],
  },
  "2Chr": {
    chapters: 36,
    splits: [1, 5, 9, 13, 17, 21, 25, 29, 33],
  },
  Ezra: {
    chapters: 10,
    splits: [1, 4, 7],
  },
  Neh: {
    chapters: 13,
    splits: [1, 4, 7, 10],
  },
  Esth: {
    chapters: 10,
    splits: [1, 4, 7],
  },
  Job: {
    chapters: 42,
    splits: [1, 5, 9, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40],
  },
  Ps: {
    chapters: 150,
    splits: [
      1, 5, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55,
      58, 61, 64, 67, 70, 73, 76, 79, 82, 85, 88, 91, 94, 97, 100, 103, 106,
      109, 112, 116, 119, 120, 124, 128, 132, 136, 139, 142, 145, 148,
    ],
  },
  Prov: {
    chapters: 31,
    splits: [1, 4, 7, 10, 13, 16, 19, 22, 24, 27, 29],
  },
  Eccl: {
    chapters: 12,
    splits: [1, 4, 7, 10],
  },
  Song: {
    chapters: 8,
    splits: [1, 4, 7],
  },
  Isa: {
    chapters: 66,
    splits: [
      1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46, 49, 52, 55,
      58, 61, 64,
    ],
  },
  Jer: {
    chapters: 52,
    splits: [
      1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 36, 39, 42, 44, 47, 50,
    ],
  },
  Lam: {
    chapters: 5,
    splits: [1, 4],
  },
  Ezek: {
    chapters: 48,
    splits: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46],
  },
  Dan: {
    chapters: 12,
    splits: [1, 4, 7, 10],
  },
  Hos: {
    chapters: 14,
    splits: [1, 4, 7, 10, 13],
  },
  Joel: {
    chapters: 3,
    splits: [1],
  },
  Amos: {
    chapters: 9,
    splits: [1, 4, 7],
  },
  Obad: {
    chapters: 1,
    splits: [1],
  },
  Jonah: {
    chapters: 4,
    splits: [1, 3],
  },
  Mic: {
    chapters: 7,
    splits: [1, 4, 6],
  },
  Nah: {
    chapters: 3,
    splits: [1],
  },
  Hab: {
    chapters: 3,
    splits: [1],
  },
  Zeph: {
    chapters: 3,
    splits: [1],
  },
  Hag: {
    chapters: 2,
    splits: [1],
  },
  Zech: {
    chapters: 14,
    splits: [1, 4, 7, 10, 12],
  },
  Mal: {
    chapters: 4,
    splits: [1, 3],
  },
  Matt: {
    chapters: 28,
    splits: [1, 4, 7, 10, 13, 17, 20, 24],
  },
  Mark: {
    chapters: 16,
    splits: [1, 5, 9, 13],
  },
  Luke: {
    chapters: 24,
    splits: [1, 4, 8, 12, 15, 18, 21],
  },
  John: {
    chapters: 21,
    splits: [1, 5, 9, 13, 17, 20],
  },
  Acts: {
    chapters: 28,
    splits: [1, 5, 9, 13, 17, 21, 25],
  },
  Rom: {
    chapters: 16,
    splits: [1, 4, 7, 10, 12, 15],
  },
  "1Cor": {
    chapters: 16,
    splits: [1, 4, 7, 10, 13, 15],
  },
  "2Cor": {
    chapters: 13,
    splits: [1, 4, 7, 10],
  },
  Gal: {
    chapters: 6,
    splits: [1, 4],
  },
  Eph: {
    chapters: 6,
    splits: [1, 4],
  },
  Phil: {
    chapters: 4,
    splits: [1, 3],
  },
  Col: {
    chapters: 4,
    splits: [1, 3],
  },
  "1Thess": {
    chapters: 5,
    splits: [1, 4],
  },
  "2Thess": {
    chapters: 3,
    splits: [1],
  },
  "1Tim": {
    chapters: 6,
    splits: [1, 4],
  },
  "2Tim": {
    chapters: 4,
    splits: [1, 3],
  },
  Titus: {
    chapters: 3,
    splits: [1],
  },
  Phlm: {
    chapters: 1,
    splits: [1],
  },
  Heb: {
    chapters: 13,
    splits: [1, 4, 7, 10],
  },
  Jas: {
    chapters: 5,
    splits: [1, 4],
  },
  "1Pet": {
    chapters: 5,
    splits: [1, 4],
  },
  "2Pet": {
    chapters: 3,
    splits: [1],
  },
  "1John": {
    chapters: 5,
    splits: [1, 4],
  },
  "2John": {
    chapters: 1,
    splits: [1],
  },
  "3John": {
    chapters: 1,
    splits: [1],
  },
  Jude: {
    chapters: 1,
    splits: [1],
  },
  Rev: {
    chapters: 22,
    splits: [1, 4, 7, 10, 14, 17, 20],
  },
};

// Total chapters in the Bible
export const TOTAL_CHAPTERS = Object.values(BookInfo).reduce(
  (sum, bookMeta) => sum + bookMeta.chapters,
  0,
); // 1189
