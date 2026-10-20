import { useState } from "react";
import styles from "./Laboratories.module.css";
import Calendar from "./Calendar/Calendar";
import { MoveUp, Bell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLabs,
  useLab,
  useLabSchedule,
} from "@/features/laboratories/queries";
import { useCreateBooking } from "@/features/bookings/mutation";

const Laboratories = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>("");
  const [beginning, setBeginning] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [purposeText, setPurposeText] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleRangeChange = (
    range: { date: string; start: string; end: string } | null,
  ) => {
    if (!range) {
      setDateValue("");
      setBeginning("");
      setEnd("");
      return;
    }
    setDateValue(range.date);
    setBeginning(range.start);
    setEnd(range.end);
  };

  const createBookingMutation = useCreateBooking();

  const handleCreateBooking = () => {
    if (!labId || !dateValue || !beginning || !end) return;

    createBookingMutation.mutate({
      labId,
      startTime: new Date(`${dateValue}T${beginning}:00`).toISOString(),
      endTime: new Date(`${dateValue}T${end}:00`).toISOString(),
      purpose: purposeText,
      accessNote: note,
    });
  };

  const resetBooking = () => {
    setDateValue("");
    setBeginning("");
    setEnd("");
    setPurposeText("");
    setNote("");
  };

  const { labId } = useParams<{ labId: string }>();

  const { labs } = useLabs();
  const { lab } = useLab(labId);
  const { schedule } = useLabSchedule(labId);

  if (labId) {
    if (!lab) {
      return <div>Laboratory not found</div>;
    }

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
            <p className={styles.labId}>{lab.id}</p>
            <h1 className={styles.labHeader}>{lab.name}</h1>
            <span className={styles.labAddress}>
              {lab.building} <span>The lab fits {lab.capacity} people</span>
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
            <p className={styles.leftPartDescriptionText}>{lab.description}</p>
          </div>
          <div className={styles.subHeaderRightPart}>
            <p className={styles.leftPartDescription}>EQUIPMENT</p>
            <ul className={styles.leftPartOptions}>
              {lab.equipment.map((item) => (
                <li key={item} className={styles.leftPartDescriptionText}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className={styles.calendarSection}>
          <div className={styles.calendarContainer}>
            <Calendar schedule={schedule} onRangeChange={handleRangeChange} />
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
                onClick={resetBooking}
              >
                Reset
              </button>
            </div>
            <label className={styles.inputContainer}>
              Purpose{" "}
              <textarea
                value={purposeText}
                onChange={(e) => setPurposeText(e.target.value)}
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
            <button
              className={styles.bookingButton}
              onClick={handleCreateBooking}
            >
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
        <p>All: {labs.length}</p>
        <p>The laboratory ID is used in subscription topics: lab:{"<id>"}</p>
      </span>
      <ul className={styles.labOptionsContainer}>
        {labs.map((lab) => (
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
