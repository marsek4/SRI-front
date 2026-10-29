import { useState, useEffect } from "react";
import styles from "./Calendar.module.css";
import type { LabSchedule } from "@/features/laboratories/types";

type Day = {
  label: string;
  date: number;
  month: number;
  year: number;
};

const HOURS = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const formatTime = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

const getWeekDays = () => {
  const now = new Date();
  const today = now.getDay();
  const mondayOffSet = today === 0 ? -6 : 1 - today;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffSet);
  monday.setHours(0, 0, 0, 0);

  const labels = ["MON", "TUE", "WED", "THU", "FRI", "SUT", "SUN"];

  return labels.map((label, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    return {
      label,
      date: d.getDate(),
      month: d.getMonth(),
      year: d.getFullYear(),
    };
  });
};

type CalendarProps = {
  schedule?: LabSchedule;
  onRangeChange: (
    range: { date: string; start: string; end: string } | null,
  ) => void;
};

const Calendar = ({ schedule, onRangeChange }: CalendarProps) => {
  const DAYS = getWeekDays();

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [dragMode, setDragMode] = useState<"add" | "remove">("add");

  console.log(schedule);

  const now = new Date();

  const parseHour = (hour: string) => parseInt(hour, 10);
  const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;
  const cellKey = (day: Day, hour: string) =>
    `${day.year}-${day.month}-${day.date}-${hour}`;

  const isPast = (day: Day, hour: string) =>
    new Date(day.year, day.month, day.date, parseHour(hour), 0) < now;

  const isToday = (day: Day) =>
    day.year === now.getFullYear() &&
    day.month === now.getMonth() &&
    day.date === now.getDate();

  // const isOccupied = (day: Day, hour: string) => {
  //   if (!schedule) return false;
  //   const cellStart = new Date(
  //     day.year,
  //     day.month,
  //     day.date,
  //     parseHour(hour),
  //     0,
  //   );
  //   const cellEnd = new Date(cellStart.getTime() + 60 * 60 * 1000);
  //   return schedule.busy.some((i) => {
  //     const start = new Date(i.startTime);
  //     const end = new Date(i.endTime);
  //     return cellStart < end && cellEnd > start;
  //   });
  // };

  const isOccupiedByMe = (day: Day, hour: string) => {
    if (!schedule) return false;
    const cellStart = new Date(
      day.year,
      day.month,
      day.date,
      parseHour(hour),
      0,
    );
    const cellEnd = new Date(cellStart.getTime() + 60 * 60 * 1000);

    return schedule.busy.some((i) => {
      if (!i.mine) return false;
      const start = new Date(i.startTime);
      const end = new Date(i.endTime);
      return cellStart < end && cellEnd > start;
    });
  };

  const isOccupiedByOthers = (day: Day, hour: string) => {
    if (!schedule) return false;
    const cellStart = new Date(
      day.year,
      day.month,
      day.date,
      parseHour(hour),
      0,
    );
    const cellEnd = new Date(cellStart.getTime() + 60 * 60 * 1000);

    return schedule.busy.some((i) => {
      if (i.mine) return false;
      const start = new Date(i.startTime);
      const end = new Date(i.endTime);
      return cellStart < end && cellEnd > start;
    });
  };

  const getMyBooking = (day: Day, hour: string) => {
    if (!schedule) return null;
    const cellStart = new Date(
      day.year,
      day.month,
      day.date,
      parseHour(hour),
      0,
    );
    const cellEnd = new Date(cellStart.getTime() + 60 * 60 * 1000);
    return (
      schedule.busy.find((i) => {
        if (!i.mine) return false;
        const start = new Date(i.startTime);
        const end = new Date(i.endTime);
        return cellStart < end && cellEnd > start;
      }) ?? null
    );
  };

  const getOthersBooking = (day: Day, hour: string) => {
    if (!schedule) return null;
    const cellStart = new Date(
      day.year,
      day.month,
      day.date,
      parseHour(hour),
      0,
    );
    const cellEnd = new Date(cellStart.getTime() + 60 * 60 * 1000);
    return (
      schedule.busy.find((i) => {
        if (i.mine) return false;
        const start = new Date(i.startTime);
        const end = new Date(i.endTime);
        return cellStart < end && cellEnd > start;
      }) ?? null
    );
  };

  const parseHourFromKey = (key: string) => {
    const parts = key.split("-");
    return parseInt(parts[parts.length - 1], 10);
  };

  const getSelectionRange = () => {
    if (selectedCells.size === 0) return null;
    const hours = Array.from(selectedCells).map(parseHourFromKey);
    return { start: Math.min(...hours), end: Math.max(...hours) + 1 };
  };

  const range = getSelectionRange();

  useEffect(() => {
    const handleMouseUp = () => setIsSelecting(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    if (!range) {
      onRangeChange(null);
      return;
    }

    const firstKey = Array.from(selectedCells)[0];
    const [year, month, date] = firstKey.split("-");
    const formattedDate = `${year}-${String(Number(month) + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;

    onRangeChange({
      date: formattedDate,
      start: formatHour(range.start),
      end: formatHour(range.end),
    });
  }, [range?.start, range?.end]);

  const handleMouseDown = (day: Day, key: string) => {
    setIsSelecting(true);

    const firstKey = Array.from(selectedCells)[0];
    const firstDay = firstKey?.split("-").slice(0, 3).join("-");
    const currentDay = key.split("-").slice(0, 3).join("-");

    if (firstDay && firstDay !== currentDay) {
      setDragMode("add");
      setSelectedCells(new Set([key]));
      return;
    }

    const isCurrentlySelected = selectedCells.has(key);
    setDragMode(isCurrentlySelected ? "remove" : "add");
    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (isCurrentlySelected) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleMouseEnter = (key: string) => {
    if (!isSelecting) return;

    const firstKey = Array.from(selectedCells)[0];
    if (!firstKey) return;

    const firstDay = firstKey.split("-").slice(0, 3).join("-");
    const currentDay = key.split("-").slice(0, 3).join("-");
    if (firstDay !== currentDay) return;

    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (dragMode === "add") next.add(key);
      else next.delete(key);
      return next;
    });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarTime}>
        <div className={styles.blankCell} />
        {HOURS.map((hour) => (
          <div key={hour} className={styles.timeCell}>
            <p className={styles.timeCellText}>{hour}</p>
          </div>
        ))}
      </div>

      {DAYS.map((day) => (
        <div key={day.label} className={styles.calendarDay}>
          <div
            className={`${styles.calendarDayTop} ${isToday(day) ? styles.calendarDayToday : ""}`}
          >
            <p className={styles.calendarDayText}>{day.label}</p>
            <p className={styles.calendarDayNumber}>{day.date}</p>
          </div>

          {HOURS.map((hour) => {
            const key = cellKey(day, hour);
            const selected = selectedCells.has(key);
            const past = isPast(day, hour);
            const myBooking = getMyBooking(day, hour);

            const myStart = myBooking ? new Date(myBooking.startTime) : null;
            const isMyBookingStart =
              myStart !== null &&
              myStart.getFullYear() === day.year &&
              myStart.getMonth() === day.month &&
              myStart.getDate() === day.date &&
              myStart.getHours() === parseHour(hour);

            const otherBooking = getOthersBooking(day, hour);
            const otherStart = otherBooking
              ? new Date(otherBooking.startTime)
              : null;
            const isOtherBookingStart =
              otherStart !== null &&
              otherStart.getFullYear() === day.year &&
              otherStart.getMonth() === day.month &&
              otherStart.getDate() === day.date &&
              otherStart.getHours() === parseHour(hour);

            const occupiedByOthers = isOccupiedByOthers(day, hour);
            const occupiedByMe = isOccupiedByMe(day, hour);
            const isOccupied = occupiedByMe || occupiedByOthers;
            const hourNum = parseHour(hour);
            const showLabel =
              range &&
              selected &&
              hourNum === range.start &&
              range.end > range.start + 1;

            return (
              <div
                key={hour}
                onMouseDown={() =>
                  !past && !isOccupied && handleMouseDown(day, key)
                }
                onMouseEnter={() =>
                  !past && !isOccupied && handleMouseEnter(key)
                }
                className={[
                  styles.calendarDayCell,
                  past && styles.calendarPastDayCell,
                  occupiedByOthers && styles.calendarOccupiedByOthers,
                  occupiedByMe && styles.calendarOccupiedByMe,
                  selected && styles.calendarSelectedCell,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {showLabel && (
                  <span className={styles.selectionLabel}>
                    {formatHour(range.start)} – {formatHour(range.end)}
                  </span>
                )}
                {isMyBookingStart && (
                  <span className={styles.bookingLabel}>
                    <span className={styles.bookingLabelTitle}>
                      Your booking
                    </span>
                    <span className={styles.bookingLabelTime}>
                      {formatTime(new Date(myBooking!.startTime))} –{" "}
                      {formatTime(new Date(myBooking!.endTime))}
                    </span>
                  </span>
                )}

                {isOtherBookingStart && (
                  <span className={styles.bookingLabel}>
                    <span className={styles.bookingLabelTitle}>Booked</span>
                    <span className={styles.bookingLabelTime}>
                      {formatTime(new Date(otherBooking!.startTime))} –{" "}
                      {formatTime(new Date(otherBooking!.endTime))}
                    </span>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
