import { XIcon } from "@heroicons/react/solid";
import "../css/popupView.css";
import "../css/popupEditor.css";
import '../css/styles.css';

interface PopupViewProps {
  title: string;
  content: string;
  onClose: () => void;
}

const PopupView: React.FC<PopupViewProps> = ({
  title,
  content,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <XIcon className="h-8 w-8" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-600 pb-2">
          {title}
        </h2>
        <div className="text-gray-300 mb-4">
          <p className="text-base">{content}</p>
        </div>
        <div className="flex justify-between items-center border-t border-gray-600 pt-4 mt-4">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition"
          >
            Close
          </button>
          <span className="text-gray-400 text-sm">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PopupView;
