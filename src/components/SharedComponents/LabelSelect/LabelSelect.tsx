import styles from "./LabelSelect.module.css";

type Option = {
  id: string;
  name: string;
};

type BaseProps = {
  upperText: string;
  value: string;
  setValue: (value: string) => void;
};

type ArrayStringProps = BaseProps & {
  variant: "strings";
  options: string[];
};

type ArrayObjectsProps = BaseProps & {
  variant: "objects";
  options: Option[];
};

type LabelSelectProps = ArrayStringProps | ArrayObjectsProps;

const LabelSelect = ({
  upperText,
  variant,
  options,
  value,
  setValue,
}: LabelSelectProps) => {
  return (
    <label className={styles.labelContainer}>
      {upperText}
      {variant === "strings" ? (
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.selectField}
        >
          <option value="">Choose...</option>
          {options.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={styles.selectField}
        >
          <option value="">Choose...</option>
          {options.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </label>
  );
};

export default LabelSelect;
