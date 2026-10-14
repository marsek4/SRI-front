import { useState, useEffect } from "react";
import styles from "./Laboratories.module.css";
import { useLabs } from "@/hooks/useLabs";
import { useLabSchedule } from "@/hooks/useLabSchedule";
import { MoveUp, Bell, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Laboratories = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>("");
  const [beginning, setBeginning] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [aimText, setAimText] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionStart, setSelectionStart] = useState<string | null>(null);
  const [dragMode, setDragMode] = useState<"add" | "remove">("add");

  useEffect(() => {
    const handleMouseUp = () => setIsSelecting(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const { labId } = useParams<{ labId: string }>();

  const { laboratories, isLoading, isError, error } = useLabs();

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

  const now = new Date();

  type Day = {
    label: string;
    date: number;
    month: number;
    year: number;
  };

  const parseHour = (hour: string) => parseInt(hour, 10);

  const isPast = (day: Day, hour: string) => {
    const cellDate = new Date(
      day.year,
      day.month,
      day.date,
      parseHour(hour),
      0,
    );
    return cellDate < now;
  };

  const isToday = (day: Day) => {
    return (
      day.year === now.getFullYear() &&
      day.month === now.getMonth() &&
      day.date === now.getDate()
    );
  };

  // const isCurrentHour = (day: Day, hour: string) => {
  //   if (!isToday(day)) return false;
  //   return parseHour(hour) === now.getHours();
  // };

  const cellKey = (day: Day, hour: string) => `${day.date}-${hour}`;

  const handleMouseDown = (key: string) => {
    setIsSelecting(true);
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

    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (dragMode === "add") next.add(key);
      else next.delete(key);
      return next;
    });
  };

  const parseHourFromKey = (key: string) => {
    const parts = key.split("-");
    return parseInt(parts[parts.length - 1], 10);
  };

  const getSelectionRange = () => {
    if (selectedCells.size === 0) return null;

    const hours = Array.from(selectedCells).map(parseHourFromKey);
    const minHour = Math.min(...hours);
    const maxHour = Math.max(...hours);

    return {
      start: minHour,
      end: maxHour + 1,
    };
  };

  const formatHour = (h: number) => `${String(h).padStart(2, "0")}:00`;

  const range = getSelectionRange();

  useEffect(() => {
    if (!range) {
      setBeginning("");
      setEnd("");
      return;
    }
    setBeginning(formatHour(range.start));
    setEnd(formatHour(range.end));
  }, [range?.start, range?.end]);

  const DAYS: Day[] = [
    { label: "MON", date: 12, month: 9, year: 2026 },
    { label: "TUE", date: 13, month: 9, year: 2026 },
    { label: "WED", date: 14, month: 9, year: 2026 },
    { label: "THU", date: 15, month: 9, year: 2026 },
    { label: "FRI", date: 16, month: 9, year: 2026 },
    { label: "SUT", date: 17, month: 9, year: 2026 },
    { label: "SUN", date: 18, month: 9, year: 2026 },
  ];

  const createBooking = () => {
    console.log(123);
  };

  const resetBooking = () => {
    setDateValue("");
    setSelectedCells(new Set());
  };

  if (labId) {
    const lab = laboratories.find((l) => l.id === labId);

    return (
      <div className={styles.oneLabContainer}>
        <nav className={styles.navigationBackContainer}>
          <button
            className={styles.backButton}
            onClick={() => navigate("/laboratories")}
          >
            {" "}
            <MoveUp className={styles.arrowBack} />
            All laboratories
          </button>
        </nav>
        <header className={styles.oneLabHeader}>
          <div className={styles.labDescription}>
            <p className={styles.labId}>{lab?.id}</p>
            <h1 className={styles.labHeader}>{lab?.name}</h1>
            <span className={styles.labAddress}>
              {lab?.building} <span>The lab fits {lab?.capacity} people</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => console.log("sub")}
            className={styles.subButton}
          >
            <Bell className={styles.bell} />
            Subscribe for updates
          </button>
        </header>

        <section className={styles.subHeader}>
          <div className={styles.subHeaderLeftPart}>
            <p className={styles.leftPartDescription}>DESCRIPTION</p>
            <p className={styles.leftPartDescriptionText}>{lab?.description}</p>
          </div>
          <div className={styles.subHeaderRightPart}>
            <p className={styles.leftPartDescription}>EQUIPMENT</p>
            <ul className={styles.leftPartOptions}>
              {lab?.equipment.map((item) => (
                <li key={item} className={styles.leftPartDescriptionText}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className={styles.calendarSection}>
          <div className={styles.calendarContainer}>
            <div className={styles.calendarInstruction}>
              <div>
                <h2 className={styles.occupaitonHeader}>
                  Occupation · 12 — 18 of October 2026
                </h2>
                <p className={styles.instructionText}>
                  Select a range with the mouse or select a cell using the
                  keyboard.
                </p>
              </div>
              <div className={styles.backForwardButtonContainer}>
                <button className={styles.backForwardButton}>
                  <ChevronLeft className={styles.chevron} />
                </button>
                <div className={styles.currentWeekText}>Current week</div>
                <button className={styles.backForwardButton}>
                  <ChevronRight className={styles.chevron} />
                </button>
              </div>
            </div>
            <div className={styles.calendarColors}>
              <div className={styles.colorContainer}>
                <div className={`${styles.iconOccupied} ${styles.icon}`}></div>
                <p>Occupied</p>
              </div>
              <div className={styles.colorContainer}>
                <div className={`${styles.iconYour} ${styles.icon}`}></div>
                <p>Your booking</p>
              </div>
              <div className={styles.colorContainer}>
                <div className={`${styles.iconChoosen} ${styles.icon}`}></div>
                <p>Choosen interval</p>
              </div>
              <div className={styles.colorContainer}>
                <div className={`${styles.iconPast} ${styles.icon}`}></div>
                <p>Past time</p>
              </div>
            </div>

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
                    const isSelected = selectedCells.has(key);
                    const past = isPast(day, hour);
                    const hourNum = parseHour(hour);

                    const showLabel =
                      range &&
                      isSelected &&
                      hourNum === range.start &&
                      range.end > range.start + 1;

                    return (
                      <div
                        key={hour}
                        onMouseDown={() => {
                          !past && handleMouseDown(key);
                        }}
                        onMouseEnter={() => {
                          !past && handleMouseEnter(key);
                          // setBeginning(hour);
                        }}
                        className={`${styles.calendarDayCell} ${
                          past ? styles.calendarPastDayCell : ""
                        } ${isSelected ? styles.calendarSelectedCell : ""}`}
                      >
                        {showLabel && (
                          <span className={styles.selectionLabel}>
                            {formatHour(range.start)} – {formatHour(range.end)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.calendarFormContainer}>
            <header className={styles.formHeader}>New booking</header>
            <label className={styles.inputContainer}>
              Date{" "}
              <input
                type="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
                className={styles.inputField}
              />
            </label>
            <div className={styles.periodPickingContainer}>
              <label className={styles.inputContainerPeriod}>
                Beginning{" "}
                <input
                  type="time"
                  value={beginning}
                  onChange={(e) => setBeginning(e.target.value)}
                  className={styles.inputField}
                />
              </label>
              <label className={styles.inputContainerPeriod}>
                End{" "}
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className={styles.inputField}
                />
              </label>
            </div>
            <div className={styles.currentChoosenPeriod}>
              <p className={styles.currentChoosenPeriodText}>
                Сб, 17 октября · 09:00–11:00 · 2 ч
              </p>
              <button
                type="button"
                className={styles.resetButton}
                onClick={() => resetBooking()}
              >
                Reset
              </button>
            </div>
            <label className={styles.inputContainer}>
              Aim{" "}
              <textarea
                value={aimText}
                onChange={(e) => setAimText(e.target.value)}
                className={styles.textareaField}
              />
            </label>
            <label className={styles.inputContainer}>
              Note{" "}
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={styles.inputField}
              />
            </label>
            <p className={styles.postText}>Only you and admin can see it</p>
            <button className={styles.bookingButton}>
              Book <MoveUp className={styles.moveUp} />
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.labContainer}>
      <section className={styles.labHeaderContainer}>
        <div className={styles.labHeaderText}>
          <h1 className={styles.labHeaderTitle}>Laboratories</h1>
          <p className={styles.labHeaderSubtext}>
            Catalog of rooms and equipment. Open a laboratory to view
            availability and make a reservation.
          </p>
        </div>
        {/* <div className={styles.labHeaderContainerSearch}></div> */}
        <label className={styles.inputContainer}>
          Search by name, building, or equipment{" "}
          <input
            type="text"
            value={searchValue}
            placeholder="Spectrometer"
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.inputField}
          />
        </label>
      </section>
      <span className={styles.labStatistic}>
        <p>All: {laboratories.length}</p>
        <p>The laboratory ID is used in subscription topics: lab:{"<id>"}</p>
      </span>
      <ul className={styles.labOptionsContainer}>
        {laboratories.map((lab) => (
          <li
            key={lab.id}
            className={styles.labOption}
            onClick={() => navigate(`/laboratories/${lab.id}`)}
          >
            <>
              <p className={styles.labId}>{lab.id}</p>
              <h2 className={styles.labName}>{lab.name}</h2>
              <p className={styles.labAddress}>{lab.building}</p>
              <ul className={styles.labEquipmentList}>
                {lab.equipment.map((item) => (
                  <li key={item} className={styles.labItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
            <div className={styles.scheduleButton}>
              <span className={styles.scheduleButtonText}>
                Schedule and booking
              </span>
              <MoveUp className={styles.buttonArrow} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Laboratories;
