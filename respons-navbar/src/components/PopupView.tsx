import { XIcon } from "@heroicons/react/solid";
import "../css/popupView.css";

interface PopupViewProps {
  title: string;
  content: string;
  onClose: () => void;
}

const PopupNoteView: React.FC<PopupViewProps> = ({
  title,
  content,
  onClose,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close" onClick={onClose}>
          <XIcon className="h-6 w-6" />
        </button>
        <div className="popup-header">{title}</div>
        <div className="popup-content">{content}</div>
        <div className="popup-footer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PopupNoteView;
