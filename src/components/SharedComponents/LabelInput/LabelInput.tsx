import styles from "./LabelInput.module.css";

type LabelInputProps = {
  upperText: string;
  placeholder?: string;
  isTextarea?: boolean;

  value: string;
  setValue: (value: string) => void;
};

const LabelInput = ({
  upperText,
  placeholder,
  isTextarea = false,
  value,
  setValue,
}: LabelInputProps) => {
  return (
    <label className={styles.labelContainer}>
      {upperText}{" "}
      {isTextarea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className={styles.textareaField}
        />
      ) : (
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          className={styles.inputField}
        />
      )}
    </label>
  );
};

export default LabelInput;
