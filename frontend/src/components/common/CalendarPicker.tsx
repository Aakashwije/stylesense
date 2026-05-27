import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarPickerProps {
  value: string | null;
  onChange: (date: string) => void;
  minDate?: string;
}

export function CalendarPicker({
  value,
  onChange,
  minDate = new Date().toISOString().split("T")[0],
}: CalendarPickerProps) {
  const [displayMonth, setDisplayMonth] = useState(() => {
    if (value) {
      const date = new Date(value);
      return new Date(date.getFullYear(), date.getMonth());
    }
    return new Date();
  });

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDay = getFirstDayOfMonth(displayMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from(
    { length: firstDay },
    (_, i) => i
  ).reverse();

  const handlePrevMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setDisplayMonth(
      new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1)
    );
  };

  const handleSelectDay = (day: number) => {
    const selected = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    const selectedStr = selected.toISOString().split("T")[0];
    if (selectedStr >= minDate) {
      onChange(selectedStr);
    }
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const selected = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    const selectedStr = selected.toISOString().split("T")[0];
    return selectedStr === value;
  };

  const isDisabled = (day: number) => {
    const date = new Date(
      displayMonth.getFullYear(),
      displayMonth.getMonth(),
      day
    );
    const dateStr = date.toISOString().split("T")[0];
    return dateStr < minDate;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      displayMonth.getMonth() === today.getMonth() &&
      displayMonth.getFullYear() === today.getFullYear()
    );
  };

  const monthYear = displayMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-[#1C1C22] border border-[#27272A] rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#F5F5F7] font-semibold text-sm">{monthYear}</h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-[#27272A] rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#A1A1AA]" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-[#27272A] rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-[#A1A1AA]" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="h-8 flex items-center justify-center text-[#52525B] text-xs font-medium"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {previousMonthDays.map((_, i) => (
          <div key={`prev-${i}`} className="h-8" />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleSelectDay(day)}
            disabled={isDisabled(day)}
            className={cn(
              "h-8 rounded-lg text-xs font-medium transition-all duration-200",
              isSelected(day)
                ? "bg-[#8B5CF6] text-white"
                : isToday(day)
                  ? "bg-[#27272A] text-[#8B5CF6] border border-[#8B5CF6]/50"
                  : isDisabled(day)
                    ? "text-[#52525B] cursor-not-allowed"
                    : "text-[#A1A1AA] hover:bg-[#27272A]"
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
