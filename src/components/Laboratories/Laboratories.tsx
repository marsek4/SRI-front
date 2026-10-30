import { useState } from "react";
import styles from "./Laboratories.module.css";
import commonStyles from "@/styles/shared.module.css";
import Calendar from "./Calendar/Calendar";
import { MoveUp, Bell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useLabs,
  useLab,
  useLabSchedule,
} from "@/features/laboratories/queries";
import { useCreateBooking } from "@/features/bookings/mutation";
import { useSubscribe } from "@/features/subscriptions/mutations";
import LabelInput from "../SharedComponents/LabelInput";
import RedButton from "@/components/SharedComponents/RedButton";

const Laboratories = () => {
  const navigate = useNavigate();
  const createBookingMutation = useCreateBooking();
  const subscribe = useSubscribe();

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

  // const { booking } = useBooking();

  const handleCreateBooking = () => {
    if (!labId || !dateValue || !beginning || !end) return;

    createBookingMutation.mutate(
      {
        labId,
        startTime: new Date(`${dateValue}T${beginning}:00`).toISOString(),
        endTime: new Date(`${dateValue}T${end}:00`).toISOString(),
        purpose: purposeText,
        accessNote: note,
      },
      {
        onSuccess: () => resetBooking(),
      },
    );
  };

  const handleSubscription = (labId: string) => {
    const topic = "lab:" + labId;
    subscribe.mutate({ topic: topic });
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
            <span className={commonStyles.sectionHeaderText}>
              {lab.building} <p>The lab fits {lab.capacity} people</p>
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSubscription(labId)}
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
        <section className={styles.calendarInstruction}>
          <span className={styles.calendarInstructionItem}>
            <div
              className={[styles.calendarInstructionColor, styles.booked].join(
                " ",
              )}
            ></div>
            <span className={styles.calendarInstructionText}>Booked</span>
          </span>
          <span className={styles.calendarInstructionItem}>
            <div
              className={[
                styles.calendarInstructionColor,
                styles.yourBooking,
              ].join(" ")}
            ></div>
            <span className={styles.calendarInstructionText}>Your booking</span>
          </span>
          <span className={styles.calendarInstructionItem}>
            <div
              className={[
                styles.calendarInstructionColor,
                styles.choosenInterval,
              ].join(" ")}
            ></div>
            <span className={styles.calendarInstructionText}>
              Choosen interval
            </span>
          </span>
          <span className={styles.calendarInstructionItem}>
            <div
              className={[
                styles.calendarInstructionColor,
                styles.pastTime,
              ].join(" ")}
            ></div>
            <span className={styles.calendarInstructionText}>Past time</span>
          </span>
        </section>
        <section className={styles.calendarSection}>
          <div className={styles.calendarContainer}>
            <Calendar schedule={schedule} onRangeChange={handleRangeChange} />
          </div>
          <div className={styles.calendarFormContainer}>
            <header className={styles.formHeader}>New booking</header>
            <LabelInput
              upperText="Date"
              type="date"
              value={dateValue}
              setValue={setDateValue}
            />
            <div className={styles.periodPickingContainer}>
              <LabelInput
                upperText="Beginning"
                type="time"
                value={beginning}
                setValue={setBeginning}
              />
              <LabelInput
                upperText="End"
                type="time"
                value={end}
                setValue={setEnd}
              />
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
            <LabelInput
              upperText="Purpose"
              isTextarea={true}
              value={purposeText}
              setValue={setPurposeText}
            />
            <LabelInput upperText="Note" value={note} setValue={setNote} />
            <p className={styles.postText}>Only you and admin can see it</p>
            <RedButton
              buttonText="Book"
              onClickFunction={handleCreateBooking}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.labContainer}>
      <section className={styles.labHeaderContainer}>
        <div className={styles.labHeaderText}>
          <h1 className={commonStyles.sectionHeaderText}>Laboratories</h1>
          <p className={commonStyles.sectionHeaderSubText}>
            Catalog of rooms and equipment. Open a laboratory to view
            availability and make a reservation.
          </p>
        </div>
        <LabelInput
          upperText="Search by name, building, or equipment"
          value={searchValue}
          setValue={setSearchValue}
        />
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
              <h2 className={commonStyles.smallHeaderText}>{lab.name}</h2>
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
