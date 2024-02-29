import { useRef, forwardRef, useImperativeHandle } from "react";
import "./style.scss";
const ModalTemplate = forwardRef(({ children, onClose }, ref) => {
  const dialogRef = useRef();
  const handleCancel = (event) => {
    if (onClose) onClose();
  };
  useImperativeHandle(ref, () => ({
    openModal: () => {
      if (dialogRef.current) dialogRef.current.showModal();
    },
    closeModal: () => {
      if (dialogRef.current) dialogRef.current.close();
      if (onClose) onClose();
    },
  }));
  return (
    <dialog ref={dialogRef} className="modal-dialog" onCancel={handleCancel}>
      <div className="modal-content">
        <button
          onClick={() => ref.current.closeModal()}
          className="close-button"
        >
          &times;
        </button>
        {children}
      </div>
    </dialog>
  );
});

export default ModalTemplate;
