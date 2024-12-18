import { BookInfo, TOTAL_CHAPTERS } from "./bookMeta";

describe("bookMeta", () => {
  it("should have 66 books", () => {
    expect(Object.keys(BookInfo).length).toBe(66);
  });

  it("should have the correct splits", () => {
    for (const book of Object.keys(BookInfo)) {
      // check if the splits are strictly increasing
      const splits = BookInfo[book].splits;
      for (let i = 0; i < splits.length - 1; i++) {
        expect(splits[i]).toBeLessThan(splits[i + 1]);
      }
      expect(splits[splits.length - 1]).toBeLessThanOrEqual(
        BookInfo[book].chapters,
      );
    }
    const totalSplits = Object.values(BookInfo)
      .map((book) => book.splits.length)
      .reduce((a, b) => a + b, 0);
    expect(totalSplits).toBe(365);
  });

  it("should have the correct total chapters", () => {
    expect(TOTAL_CHAPTERS).toBe(1189);
  });
});
