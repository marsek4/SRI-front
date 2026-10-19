import styles from "./Experiments.module.css";
import { MoveUp, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SearchMode = "my" | "institute";

const Experiments = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>("my");
  const [name, setName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [ownersLogin, setOwnersLogin] = useState<string>("");
  const [examples, setExamples] = useState<string>("");

  const navigate = useNavigate();

  const handleNewExperiment = () => {
    navigate("/experiments/new-experiment");
  };

  return (
    <div className={styles.experminentsContainer}>
      <header className={styles.experimentsHeader}>
        <div className={styles.experimentsHeaderTextContainer}>
          <h1 className={styles.experimentsHeaderText}>Experiments</h1>
          <p className={styles.experimentsHeaderSubtext}>
            The search covers the institute’s public experiments as well as your
            own.
          </p>
        </div>
        <button
          type="button"
          className={styles.newExperimentButton}
          onClick={handleNewExperiment}
        >
          New experiment <MoveUp className={styles.arrow} />
        </button>
      </header>
      <section className={styles.modePanel}>
        <span
          className={`${styles.modePanelOption} ${searchMode === "my" ? styles.isModeActive : ""}`}
          onClick={() => setSearchMode("my")}
        >
          My experiments
        </span>
        <span
          className={`${styles.modePanelOption} ${searchMode === "institute" ? styles.isModeActive : ""}`}
          onClick={() => setSearchMode("institute")}
        >
          Search within the institute
        </span>
      </section>
      <section>
        {searchMode === "my" ? (
          <div>
            <p>hi</p>
          </div>
        ) : (
          <section className={styles.filterSection}>
            <div className={styles.inputRow}>
              <label className={styles.inputContainer}>
                Name begins with{" "}
                <input
                  type="text"
                  value={name}
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                />
              </label>

              <label className={styles.inputContainer}>
                Visibility{" "}
                <select className={styles.inputField}>
                  <option value="">Any</option>
                  <option value="planned">Planned</option>
                  <option value="progress">In progress</option>
                  <option value="ended">Ended</option>
                  <option value="failed">Failed</option>
                </select>
              </label>

              <label className={styles.inputContainer}>
                Laboratory{" "}
                <select className={styles.inputField}>
                  <option value="">Any</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </label>

              <label className={styles.inputContainer}>
                Polymer{" "}
                <input
                  type="text"
                  value={tag}
                  placeholder="polymer"
                  onChange={(e) => setTag(e.target.value)}
                  className={styles.inputField}
                />
              </label>
            </div>
            <div className={styles.inputRow}>
              <label className={styles.inputContainer}>
                Owner's login{" "}
                <input
                  type="text"
                  value={ownersLogin}
                  placeholder="login"
                  onChange={(e) => setOwnersLogin(e.target.value)}
                  className={styles.inputField}
                />
              </label>
              <label className={styles.inputContainer}>
                No fewer than [number] examples{" "}
                <input
                  type="text"
                  value={examples}
                  placeholder="145"
                  onChange={(e) => setExamples(e.target.value)}
                  className={styles.inputField}
                />
              </label>
            </div>
            <div className={styles.inputRow}>
              <button className={styles.searchButton}>
                <Search className={styles.searchIcon} />
                Search
              </button>
              <button className={styles.resetButton}>Reset</button>
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Experiments;
