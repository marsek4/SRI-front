import styles from "./Authorization.module.css";
import { useState } from "react";
import { MoveUp } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import {
  type LoginData,
  type RegisterData,
  // type UserData,
  type FullUserData,
} from "@/types/types";
import { useNavigate } from "react-router-dom";

type AuthMode = "authorization" | "registration";

const Authorization = () => {
  const navigate = useNavigate();

  // const qc = useQueryClient();

  const setAuth = useAuthStore((s) => s.setAuth);

  const mutation = useMutation({
    mutationFn: async (data: LoginData | RegisterData) => {
      const url =
        formMode === "authorization"
          ? "/api/v1/auth/login"
          : "api/v1/auth/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const result: FullUserData = await res.json();

      return result;
    },
    onSuccess: (data) => {
      // qc.invalidateQueries({ queryKey: ["auth"] });
      setAuth({
        accessToken: data.accessToken,
        expiresAt: data.expiresAt,
        user: data.user,
      });
      navigate("/overview");
    },
    onError: (error) => {
      console.error("Ошибка запроса: ", error);
    },
  });

  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [error, setError] = useState<string>("");
  const [formMode, setFormMode] = useState<AuthMode>("authorization");

  const handleSubmit = () => {
    if (formMode === "authorization") {
      mutation.mutate({ username, password });
    } else {
      mutation.mutate({ username, displayName, password });
    }
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
        <div className={styles.rightSectionMode}>
          <span
            className={`${styles.signInText} ${formMode === "authorization" ? styles.signInTextActive : ""}`}
            onClick={() => setFormMode("authorization")}
          >
            Sign in
          </span>
          <span
            className={`${styles.signUpText} ${formMode === "registration" ? styles.signUpTextActive : ""}`}
            onClick={() => setFormMode("registration")}
          >
            Sign up
          </span>
        </div>
        <h2 className={styles.rightSectionHeader}>
          {formMode === "authorization" ? "Login portal" : "New account"}
        </h2>
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
          {formMode === "registration" && (
            <label className={styles.rightSectionInputContainer}>
              Display name{" "}
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={styles.rightSectionInput}
              />
            </label>
          )}
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
            <p className={styles.buttonText}>
              {formMode === "authorization" ? "Sign in" : "Sign up"}
            </p>
            <MoveUp className={styles.buttonArrow} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Authorization;
