"use client";

import { useState } from "react";
import { DayReading, generateReadingPlan } from "./utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "./components/Calendar";
import { BIBLE_BOOKS, Book } from "./bookMeta";
import { BookOrderInput } from "./components/BookOrderInput";
import { useTranslations } from "next-intl";

function groupByMonth(dayReadings: DayReading[]): DayReading[][] {
  const monthlyPlans: DayReading[][] = [];
  let currentMonth = "";
  let currentMonthPlans: DayReading[] = [];

  for (const reading of dayReadings) {
    const [year, month] = reading.date.split("-");
    const monthKey = `${year}-${month}`;

    if (monthKey !== currentMonth) {
      // We've hit a new month
      // If currentMonthPlans has items, push it to monthlyPlans
      if (currentMonthPlans.length > 0) {
        monthlyPlans.push(currentMonthPlans);
      }
      currentMonth = monthKey;
      currentMonthPlans = [reading]; // start new array for this month
    } else {
      currentMonthPlans.push(reading);
    }
  }

  // Push the last month's plans if any
  if (currentMonthPlans.length > 0) {
    monthlyPlans.push(currentMonthPlans);
  }

  return monthlyPlans;
}

export default function BibleReadingCalendar() {
  const [year, setYear] = useState<number>(new Date().getFullYear() + 1);
  const [yearlyPlans, setYearlyPlans] = useState<DayReading[]>([]);
  const [bookOrder, setBookOrder] = useState<Book[]>(BIBLE_BOOKS);
  const t = useTranslations('app.apps.bible-reading-calendar');

  const monthlyPlans = groupByMonth(yearlyPlans);

  const handleGenerate = () => {
    const readingPlan = generateReadingPlan(year, bookOrder);
    setYearlyPlans(readingPlan);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6">
          {t('title')}
        </h1>

        <div className="flex items-center space-x-4 mb-6">
          <BookOrderInput bookOrder={bookOrder} setBookOrder={setBookOrder} />
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            placeholder="Year"
          />
          <Button onClick={handleGenerate} variant="default">
            Generate
          </Button>
        </div>

        {monthlyPlans.length > 0 &&
          monthlyPlans.map((monthPlans, index) => (
            <div key={index} className="overflow-x-auto">
              <Calendar plans={monthPlans} />
            </div>
          ))}

        {yearlyPlans.length === 0 && (
          <p className="text-gray-700">No reading plan generated yet.</p>
        )}
      </div>
    </div>
  );
}
