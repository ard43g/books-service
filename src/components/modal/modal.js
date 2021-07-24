import ReactDOM from "react-dom";
import styles from "./modal.module.css";

const Modal = ({ onCloseModal, message, critical }) => {
    document.body.style.overflow = "hidden";
    function onModalClose() {
        document.body.style.overflow = "auto";
        onCloseModal();
    }
    return ReactDOM.createPortal(
        <div className={styles.modal__wrapper}>
            <div className={styles.modal__body}>
                {!critical && (
                    <div className={styles.modal__close} onClick={onModalClose}>
                        X
                    </div>
                )}
                <div className={styles.modal__text}> {message}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
