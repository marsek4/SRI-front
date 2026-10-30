import styles from "./Experiments.module.css";
import commonStyles from "@/styles/shared.module.css";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperiments } from "@/features/experiments/queries";
import LabelInput from "@/components/SharedComponents/LabelInput";
import LabelSelect from "../SharedComponents/LabelSelect";
import RedButton from "@/components/SharedComponents/RedButton";
import TransparentButton from "../SharedComponents/TransparentButton";
import Table from "@/components/SharedComponents/Table";

type SearchMode = "my" | "institute";

// const statusLabels: Record<string, string> = {
//   EXPERIMENT_STATUS_PLANNED: "Planned",
//   EXPERIMENT_STATUS_PAST: "Past",
//   // 'EXPERIMENT_STATUS_PLANNED': 'Plannded',
// };

// const getExperimentStatusLabel = (status: string): string =>
//   statusLabels[status] ?? status;

const Experiments = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>("my");
  const [name, setName] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [ownersLogin, setOwnersLogin] = useState<string>("");
  const [examples, setExamples] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");

  const navigate = useNavigate();
  const { experiments } = useExperiments();

  const handleNewExperiment = () => {
    navigate("/experiments/new-experiment");
  };

  const resetInputs = () => {
    setName("");
    setTag("");
    setOwnersLogin("");
    setExamples("");
  };

  return (
    <div className={styles.experminentsContainer}>
      <header className={styles.experimentsHeader}>
        <div className={styles.experimentsHeaderTextContainer}>
          <h1 className={commonStyles.sectionHeaderText}>Experiments</h1>
          <p className={commonStyles.sectionHeaderSubText}>
            The search covers the institute’s public experiments as well as your
            own
          </p>
        </div>
        <RedButton
          buttonText="New experiment"
          onClickFunction={handleNewExperiment}
        />
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
          <section className={styles.myExpSection}>
            {/* <p>{experiments.length} notes</p> */}
            <p>{}</p>
            <Table
              headRow={[
                "NAME",
                "LABORATORY",
                "STATUS",
                "VISIBILITY",
                "OWNER",
                "SAMPLES",
                "UPDATED AT",
              ]}
              variant="experiments"
              body={experiments}
            />
            {/* <table className={commonStyles.table}>
              <tbody>
                {experiments.map((exp) => (
                  <tr key={exp.id} className={commonStyles.tableBodyRow}>
                    <td className={commonStyles.tableBodyCell}>{exp.title}</td>
                    <td className={commonStyles.tableBodyCell}>{exp.labId}</td>
                    <td className={commonStyles.tableBodyCell}>
                      {getExperimentStatusLabel(exp.status)}
                    </td>
                    <td className={commonStyles.tableBodyCell}>
                      {exp.visibility}
                    </td>
                    <td className={commonStyles.tableBodyCell}>
                      {exp.ownerUsername}
                    </td>
                    <td className={commonStyles.tableBodyCell}>
                      {exp.sampleCount}
                    </td>
                    <td className={commonStyles.tableBodyCell}>
                      {exp.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </section>
        ) : (
          <section className={styles.filterSection}>
            <div className={styles.inputRow}>
              <LabelInput
                upperText="Name begins with"
                value={name}
                placeholder="name"
                setValue={setName}
              />

              <LabelSelect
                upperText="Visibility"
                variant="strings"
                options={["Any", "Planned", "In progress", "Ended", "Failed"]}
                value={visibility}
                setValue={setVisibility}
              />

              {/* <LabelSelect
                upperText="Laboratory"
                variant="strings"
                options={["Any", "Public", "Private"]}
                value={}
              /> */}

              <LabelInput
                upperText="Polymer"
                placeholder="polymer"
                value={tag}
                setValue={setTag}
              />
            </div>
            <div className={styles.inputRow}>
              <LabelInput
                upperText="Owners login"
                value={ownersLogin}
                placeholder="login"
                setValue={setOwnersLogin}
              />

              <LabelInput
                upperText="No fewer than [number] examples"
                value={examples}
                placeholder="name"
                setValue={setExamples}
              />
            </div>
            <div className={styles.inputRow}>
              <button className={styles.searchButton}>
                <Search className={styles.searchIcon} />
                Search
              </button>
              {/* <button className={styles.resetButton}>Reset</button> */}
              <TransparentButton
                buttonText="Reset"
                onClickFunction={resetInputs}
              />
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Experiments;
