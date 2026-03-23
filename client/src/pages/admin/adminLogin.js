import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./adminLogin.module.css";

export default function AdminLogin({ loginSubmit }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!userData.username || !userData.password) {
      setError("Please enter your username and password.");
      return;
    }
    setLoading(true);
    setError("");
    const success = await loginSubmit(userData);
    setLoading(false);
    if (success) {
      navigate("/admin");
    } else {
      setError("Invalid username or password.");
      setUserData({ username: "", password: "" });
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <img src="/favicon.ico" alt="logo" className={styles.loginLogo} />
          <h1 className={styles.loginTitle}>Admin Panel</h1>
          <p className={styles.loginSubtitle}>Sign in to manage your store</p>
        </div>

        <form
          className={styles.loginForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className={styles.formGroup}>
            <label className={styles.label}>Username</label>
            <input
              className={styles.input}
              type="text"
              name="username"
              autoComplete="username"
              value={userData.username}
              placeholder="Enter your username"
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              value={userData.password}
              placeholder="Enter your password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>

          {error && <p className={styles.errorMsg}>{error}</p>}

          <button
            type="submit"
            className={styles.loginBtn}
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
