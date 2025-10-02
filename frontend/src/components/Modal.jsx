import React from "react";

function Modal({ open, onClose, children }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-99 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <div onClick={(e) => e.stopPropagation()}>{children}</div>
        </div>
      )}
    </>
  );
}

export default Modal;
