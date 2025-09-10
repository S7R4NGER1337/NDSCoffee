import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import styles from "./popUp.module.css";

function PopUp({ text, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.popUpWrap}>
      <div className={styles.popUpStyle}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export function showPopUp(text) {
  const portal = document.getElementById("portal");
  
  const container = document.createElement("div");
  portal.appendChild(container);

  const root = ReactDOM.createRoot(container);

  const removePopUp = () => {
    root.unmount();
    container.remove();
  };

  root.render(<PopUp text={text} onClose={removePopUp} />);
}