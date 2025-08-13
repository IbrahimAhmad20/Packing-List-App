import React from "react";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <p>{message}</p>
        <div style={styles.buttons}>
          <button
            onClick={onConfirm}
            style={{ background: "green", color: "#fff" }}
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            style={{ background: "red", color: "#fff" }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "250px",
    textAlign: "center",
  },
  buttons: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "space-around",
  },
};
