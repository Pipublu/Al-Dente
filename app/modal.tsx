interface ModalProps {
  message: string;
  title?: string;
  onClose: () => void;
  onContinue:() => void;
}


export default function Modal({
  title,
  message,
  onClose,
  onContinue,
} : ModalProps) {

  return <>
    <div className="centered modal-overlay">
      <div className="centered vbox modal">
        <div className="full-width left-align">
          {title && <h3 className="medium-font bold">{title}</h3>}
          <p>{message}</p>
        </div>
        <div className="centered grid-2col grid-large-spacing">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onContinue}>Confirm</button>
        </div>
      </div>
    </div>
  </>
  
}