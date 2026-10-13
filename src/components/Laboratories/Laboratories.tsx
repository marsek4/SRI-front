import { useState } from "react";
import styles from "./Laboratories.module.css";
import { useLabs } from "@/hooks/useLabs";
import { useLabSchedule } from "@/hooks/useLabSchedule";
import { MoveUp, Bell } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Laboratories = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");

  const { labId } = useParams<{ labId: string }>();

  const { laboratories, isLoading, isError, error } = useLabs();

  const {
    schedule,
    isLoading: isScheduleLoading,
    isError: isScheduleError,
    error: scheduleError,
  } = useLabSchedule(labId);

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
          <div>
            <p>{lab?.id}</p>
            <h1>{lab?.name}</h1>
            <span>
              {lab?.building} <span>The lab fits {lab?.capacity} people</span>
            </span>
          </div>
          <button type="button" onClick={() => console.log("sub")}>
            <Bell />
            Subscribe for updates
          </button>
        </header>

        <section className={styles.subHeader}>
          <div>
            <p></p>
            <p></p>
          </div>
          <div>
            <p></p>
            <ul>
              {lab?.equipment.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
