import styles from "./NewExperiment.module.css";
import { useNavigate } from "react-router-dom";
import { MoveUp } from "lucide-react";
import { useState } from "react";

type PrivacyMode = "private" | "public";

const NewExperiment = () => {
  const [name, setName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [mode, setMode] = useState<PrivacyMode>("private");
  const [samples, setSamples] = useState<string>("");
  const [results, setResults] = useState<string>("");
  const [labMagazine, setLabMagazine] = useState<string>("");

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/experiments");
  };

  const handleCreateExperiment = () => {
    console.log("qwe");
  };

  const handleCancel = () => {
    console.log("cancel");
  };

  return (
    <div className={styles.newExperimentContainer}>
      <div className={styles.backButtonContainer}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          <MoveUp className={styles.arrowBack} />
          Experiments
        </button>
      </div>
      <header className={styles.newExperimentHeader}>New experiment</header>
      <section className={styles.mainContainer}>
        <h2 className={styles.mainHeader}>Main</h2>
        <label className={styles.inputContainer}>
          <span className={styles.textContainer}>
            <p className={styles.text}>Name *</p>
            <p className={styles.textCounter}>{name.length} / 128</p>
          </span>
          <input
            type="text"
            value={name}
            maxLength={128}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </label>

        <div className={styles.threeInputContainer}>
          <label className={styles.inputOneContainer}>
            <span className={styles.textContainer}>
              <p className={styles.text}>Laboratory *</p>
            </span>
            <select className={styles.inputOne}>
              <option value="">Choose a lab</option>
            </select>
          </label>
          <div className={styles.visibilityContainer}>
            <p className={styles.text}>Visibility</p>
            <span className={styles.visibilityOptionsContainer}>
              <div
                className={`${styles.visibilityOption} ${mode === "private" ? styles.visibilityOptionActive : ""}`}
                onClick={() => setMode("private")}
              >
                Private
              </div>
              <div
                className={`${styles.visibilityOption} ${mode === "public" ? styles.visibilityOptionActive : ""}`}
                onClick={() => setMode("public")}
              >
                Public
              </div>
            </span>
            <p className={styles.subText}>
              Public is visible to all employees; private is visible only to you
            </p>
          </div>
          <label className={styles.inputOneContainer}>
            <span className={styles.textContainer}>
              <p className={styles.text}>Tags</p>
              <p className={styles.textCounter}>{tags.length} / 16</p>
            </span>
            <input
              type="text"
              value={tags}
              maxLength={16}
              placeholder="ftir, polymer"
              onChange={(e) => setTags(e.target.value)}
              className={styles.inputOne}
            />
            <p className={styles.subText}>Only a-z, 0-9 "_", "-"</p>
          </label>
        </div>
        <label className={styles.inputOneContainer}>
          <p className={styles.text}>Number of examples</p>
          <input
            type="text"
            value={samples}
            onChange={(e) => setSamples(e.target.value)}
            className={styles.inputOne}
          />
        </label>
      </section>
      <section className={styles.description}>
        <label className={styles.textareaContainer}>
          <p className={styles.text}>Results</p>
          <textarea
            value={results}
            onChange={(e) => setResults(e.target.value)}
            className={styles.inputTextarea}
          />
        </label>
        <label className={styles.textareaContainer}>
          <p className={styles.text}>Laboratory notebook</p>
          <textarea
            value={labMagazine}
            onChange={(e) => setLabMagazine(e.target.value)}
            className={styles.inputTextarea}
          />
        </label>
      </section>

      <section className={styles.buttonsContainer}>
        <p className={styles.subText}>
          A new experiment is created with the status "Scheduled." The status
          and metrics are modified on the experiment page.
        </p>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.createButton}
            onClick={handleCreateExperiment}
          >
            Create experiment
            <MoveUp className={styles.arrowForward} />
          </button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default NewExperiment;
