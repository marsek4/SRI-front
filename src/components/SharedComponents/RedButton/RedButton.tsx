import styles from "./RedButton.module.css";
import { MoveUp } from "lucide-react";

type RedButtonProps = {
  buttonText: string;
  onClickFunction: () => void;
};

const RedButton = ({ buttonText, onClickFunction }: RedButtonProps) => {
  return (
    <button type="button" className={styles.button} onClick={onClickFunction}>
      {buttonText} <MoveUp className={styles.arrow} />
    </button>
  );
};

export default RedButton;
