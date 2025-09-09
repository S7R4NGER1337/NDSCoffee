import { useEffect, useRef } from "react";
import styles from './modal.module.css'
import ReactDom from 'react-dom'


export default function Modal({ open, onClose, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.body.classList.add("dimmed");
      document.addEventListener("mousedown", handleDocumentClick);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.classList.remove("dimmed");
    }

    return () => {
      document.body.classList.remove("dimmed");
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return ReactDom.createPortal(
    <div className={styles.modalWrap}>
      <div
        className="absolute inset-0 bg-black/40"
        onMouseDown={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={styles.modalStyle}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  );
}
