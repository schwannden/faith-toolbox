import { Button } from "@/components/ui/button";
import { DayReading } from "../utils";
import { Separator } from "@/components/ui/separator";

interface CalendarProps {
  plans: DayReading[];
}

type PlanLookup = {
  [key: string]: DayReading;
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Calendar: React.FC<CalendarProps> = ({ plans }) => {
  if (!plans || plans.length === 0) {
    return <div>No plans available</div>;
  }

  // Parse the year and month from the first plan's date
  // All plans are within the same year and month according to the prompt.
  const [year, month] = plans[0].date.split("-").map(Number);
  const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
    month: "long",
  });

  // Create a mapping from YYYY-MM-DD to a boolean for easy lookup
  const planDates = new Set();
  const planLookup: PlanLookup = {};
  for (const plan of plans) {
    planDates.add(plan.date);
    planLookup[plan.date] = plan;
  }

  // JavaScript Date month is zero-based, so subtract 1 from month
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0); // day 0 of next month is the last day of current month
  const daysInMonth = lastDayOfMonth.getDate();

  // Determine the offset to start on Monday.
  // JS getDay(): 0=Sunday, 1=Monday, ..., 6=Saturday
  // We want weeks to start on Monday, so let's convert:
  // If getDay() = 1 (Monday), offset = 0
  // If getDay() = 0 (Sunday), offset should be 6
  // General formula: offset = (getDayOfFirst - 1) if getDayOfFirst != 0 else 6
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)
  const offset = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  const numberOfRows: number = Math.ceil((offset + daysInMonth) / 7);

  // We will display up to 6 weeks: 6 rows * 7 columns = 42 cells
  // The calendar starts from (1 - offset) day of the month.
  // For example, if offset is 2 and month starts on Wednesday,
  // we start two days before the 1st to align Monday start.
  const totalCells = numberOfRows * 7; // 6 weeks * 7 days
  const cells = [];
  for (let i = 0; i < totalCells; i++) {
    const dayOfMonth = i + 1 - offset; // day number starting from Monday of the first "display" week
    if (dayOfMonth < 1 || dayOfMonth > daysInMonth) {
      // This cell is outside the current month
      cells.push({ date: "", isCurrentMonth: false, chapters: [] });
    } else {
      // Current month day
      // Format date as YYYY-MM-DD to check if it's a plan day
      const currentDate = `${year.toString().padStart(4, "0")}-${month
        .toString()
        .padStart(2, "0")}-${dayOfMonth.toString().padStart(2, "0")}`;
      cells.push({
        date: currentDate,
        isCurrentMonth: true,
        plan: planLookup[currentDate],
      });
    }
  }

  // Split cells into rows of 7 days
  const rows = [];
  for (let r = 0; r < numberOfRows; r++) {
    rows.push(cells.slice(r * 7, r * 7 + 7));
  }

  return (
    <div style={{ display: "inline-block" }} className="w-full">
      <h2 className="text-2xl font-bold mb-2 mt-5 text-center">{monthName}</h2>
      <table className="w-full">
        <thead>
          <tr>
            {daysOfWeek.map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((week, wIndex) => (
            <tr key={wIndex}>
              {week.map((cell, cIndex) => {
                let buttonText = "";
                if (cell.isCurrentMonth && cell.date) {
                  const [, m, d] = cell.date.split("-").map(Number);
                  // Show month/day without year
                  buttonText = `${m}/${d}`;
                }
                return (
                  <td key={cIndex}>
                    {cell.isCurrentMonth ? (
                      <Button
                        variant="secondary"
                        size="default"
                        className="w-full h-full bg-red-100"
                      >
                        <div className="h-full">
                          {buttonText}
                          <Separator className="bg-stone-50" />
                          {cell.plan?.readableScope()}
                        </div>
                      </Button>
                    ) : (
                      <div className="h-full"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
