"use client";

import { useState } from "react";
import { DayReading, generateReadingPlan } from "./utils";

export default function BibleReadingCalendar() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [plan, setPlan] = useState<DayReading[]>([]);

  const handleGenerate = () => {
    const readingPlan = generateReadingPlan(year);
    setPlan(readingPlan);
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6">
          Bible Reading Calendar Generator
        </h1>

        <div className="flex items-center space-x-4 mb-6">
          <input
            type="number"
            className="border border-gray-300 rounded p-2 w-32"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10) + 1)}
            placeholder="Year"
          />
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate
          </button>
        </div>

        {plan.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-4 py-2 border-r">Date</th>
                  <th className="text-left px-4 py-2">Reading</th>
                </tr>
              </thead>
              <tbody>
                {plan.map((day, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 border-r">{day.date}</td>
                    <td className="px-4 py-2">
                      {day.chapters.map((ch, i) => (
                        <span key={i} className="inline-block mr-2">
                          {ch.book} {ch.chapters}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {plan.length === 0 && (
          <p className="text-gray-700">No reading plan generated yet.</p>
        )}
      </div>
    </div>
  );
}
