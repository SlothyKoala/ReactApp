import { useState, useEffect } from "react";
import '../css/popupEditor.css'

interface PopupEditorProps {
  onClose: () => void;
  onAddNote: (note: string) => void;
  onUpdateNote?: (note: string) => void;
  initialText?: string;
}

const PopupEditor: React.FC<PopupEditorProps> = ({
  onClose,
  onAddNote,
  onUpdateNote,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-md shadow-md w-96">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-2 rounded bg-gray-900 text-gray-300"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onUpdateNote) {
                onUpdateNote(text);
              } else {
                onAddNote(text);
              }
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupEditor;