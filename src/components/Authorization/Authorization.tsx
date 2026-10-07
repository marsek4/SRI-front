import styles from "./Authorization.module.css";
import { useState } from "react";

const Authorization = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = () => {
    console.log("qwe");
  };

  return (
    <div className={styles.authContainer}>
      <section className={styles.leftSection}>
        <div className={styles.leftSectionContainer}>
          <div className={styles.leftSectionHeader}>
            <span className={styles.leftSectionHeaderLogo}>SRI</span>
            <div className={styles.leftSectionHeaderTextContainer}>
              <div className={styles.leftSectionHeaderText}>Lab Portal</div>
              <span className={styles.leftSectionHeaderSubText}>
                Scientific Research Institute
              </span>
            </div>
          </div>

          <div className={styles.leftSectionDescription}>
            <h1 className={styles.leftSectionDescriptionTitle}>
              Laboratory booking and experiment tracking
            </h1>
            <p className={styles.leftSectionDescriptionText}>
              Laboratory schedules, bookings, experiment logs, and notifications
              for institute staff.
            </p>
          </div>

          <div className={styles.leftSectionFooter}></div>
        </div>
      </section>
      <section className={styles.rightSection}>
        <h2 className={styles.rightSectionHeader}>Sign in</h2>
        <div className={styles.rightSectionForm}>
          <label className={styles.rightSectionInputContainer}>
            User name{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.rightSectionInput}
            />
          </label>
          <label className={styles.rightSectionInputContainer}>
            Password{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.rightSectionInput}
            />
          </label>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.rightSectionButton}
          >
            <p className={styles.buttonText}>Sign in</p>
            {/* <img></img> */}
            <div></div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Authorization;

//   <form onSubmit={handleSubmit} className={styles.authForm}>
//     <h1>Authorization</h1>
//     <div className={styles.inputContainer}>
//       <p>login</p>
//       <input
//         type="text"
//         placeholder="login"
//         value={login}
//         onChange={(e) => setLogin(e.target.value)}
//         className={styles.authInput}
//       />
//     </div>
//     <div className={styles.inputContainer}>
//       <p>password</p>
//       <input
//         type="password"
//         placeholder="********"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className={styles.authInput}
//       />
//     </div>
//     <button type="submit" className={styles.authButton}>
//       Sign in
//     </button>
//     {/* <a></a> */}
//   </form>
