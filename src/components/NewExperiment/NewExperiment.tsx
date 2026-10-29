import styles from "./NewExperiment.module.css";
import { useNavigate } from "react-router-dom";
import { MoveUp } from "lucide-react";
import { useState } from "react";
import { useNewExperiment } from "@/features/experiments/mutations";
import { useLabs } from "@/features/laboratories/queries";
import type { NewExperiment } from "@/features/experiments/types";

type PrivacyMode = "private" | "public";

const NewExperiment = () => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [visibilityMode, setVisibilityMode] = useState<PrivacyMode>("private");
  const [sampleCount, setSampleCount] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [labId, setLabId] = useState<string>("");

  const navigate = useNavigate();
  const createNewExperiment = useNewExperiment();
  const labs = useLabs();

  const resetForm = () => {
    setTitle("");
    setTags("");
    setVisibilityMode("private");
    setSampleCount("");
    setSummary("");
    setNotes("");
    setLabId("");
  };

  const handleCreateNewExperiment = () => {
    const samples = Number(sampleCount);
    const payload: NewExperiment = {
      title: title,
      labId: labId,
      visibility:
        visibilityMode === "private"
          ? "VISIBILITY_PRIVATE"
          : "VISIBILITY_PUBLIC",
      tags: tags
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      sampleCount: samples,
      summary: summary,
      notes: notes,
    };

    createNewExperiment.mutate(payload, {
      onSuccess: () => resetForm(),
    });
  };

  const handleBack = () => {
    navigate("/experiments");
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
            <p className={styles.textCounter}>{title.length} / 128</p>
          </span>
          <input
            type="text"
            value={title}
            maxLength={128}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
        </label>

        <div className={styles.threeInputContainer}>
          <label className={styles.inputOneContainer}>
            <span className={styles.textContainer}>
              <p className={styles.text}>Laboratory *</p>
            </span>
            <select
              className={styles.inputOne}
              value={labId}
              onChange={(e) => setLabId(e.target.value)}
            >
              <option value="">Choose a lab</option>
              {labs.labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.name}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.visibilityContainer}>
            <p className={styles.text}>Visibility</p>
            <span className={styles.visibilityOptionsContainer}>
              <div
                className={`${styles.visibilityOption} ${visibilityMode === "private" ? styles.visibilityOptionActive : ""}`}
                onClick={() => setVisibilityMode("private")}
              >
                Private
              </div>
              <div
                className={`${styles.visibilityOption} ${visibilityMode === "public" ? styles.visibilityOptionActive : ""}`}
                onClick={() => setVisibilityMode("public")}
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
            value={sampleCount}
            onChange={(e) => setSampleCount(e.target.value)}
            className={styles.inputOne}
          />
        </label>
      </section>
      <section className={styles.description}>
        <label className={styles.textareaContainer}>
          <p className={styles.text}>Results</p>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={styles.inputTextarea}
          />
        </label>
        <label className={styles.textareaContainer}>
          <p className={styles.text}>Laboratory notebook</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
            onClick={handleCreateNewExperiment}
            disabled={createNewExperiment.isPending}
          >
            {createNewExperiment.isPending ? "Creating" : "Create experiment"}
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
