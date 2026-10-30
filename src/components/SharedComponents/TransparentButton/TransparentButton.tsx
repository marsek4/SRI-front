import styles from "./TransparentButton.module.css";

type TransparentButtonProps = {
  buttonText: string;
  onClickFunction: () => void;
};

const TransparentButton = ({
  buttonText,
  onClickFunction,
}: TransparentButtonProps) => {
  return (
    <button
      type="button"
      className={styles.transparentButton}
      onClick={onClickFunction}
    >
      {buttonText}
    </button>
  );
};

export default TransparentButton;
