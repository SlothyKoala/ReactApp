import React, { useState } from "react";
import { Note } from "../pages/DragnDrop";
import "../css/popupEditor.css";

interface PopupEditorProps {
  note: Note | null;
  onAddNote: (newNote: Note) => void;
  onEditNote: (updatedNote: Note) => void;
  onClose: () => void;
}

const PopupEditor: React.FC<PopupEditorProps> = ({
  note,
  onAddNote,
  onEditNote,
  onClose,
}) => {
  const [header, setHeader] = useState(note ? note.header : "");
  const [body, setBody] = useState(note ? note.body : "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: Note = {
      id: note ? note.id : Date.now().toString(),
      header,
      body,
    };

    if (note) {
      onEditNote(newNote);
    } else {
      onAddNote(newNote);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold text-gray-300 mb-4">
          {note ? "Edit Note" : "Add Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Header"
            className="w-full p-2 mb-3 border border-blue-600 rounded bg-gray-700 text-gray-300 focus:outline-none focus:border-blue-400 transition duration-200"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            className="w-full p-2 mb-3 border border-blue-600 rounded bg-gray-700 text-gray-300 focus:outline-none focus:border-blue-400 transition duration-200"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-200"
            >
              {note ? "Update" : "Add"} Note
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupEditor;
