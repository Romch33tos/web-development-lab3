import { useEffect, useRef } from 'react';

export function ConfirmDialog({ isOpen, title, onConfirm, onCancel }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  function handleBackdropClick(e) {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      onCancel={onCancel}
      onClick={handleBackdropClick}
    >
      <div className="alert">
        <p className="alert__title">{title}</p>
        <div className="alert__buttons">
          <button className="alert__btn" type="button" onClick={onCancel}>
            Нет
          </button>
          <button
            className="alert__btn alert__btn--accent"
            type="button"
            onClick={onConfirm}
            autoFocus
          >
            Да
          </button>
        </div>
      </div>
    </dialog>
  );
}
