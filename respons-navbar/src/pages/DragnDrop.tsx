import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import PopupEditor from "../components/PopupEditor";
import PopupView from "../components/PopupView";
import {
  PencilIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import "../css/notebook.css";
import "../css/popupView.css";
import "../css/popupEditor.css";

export interface Note {
  id: string;
  header: string;
  body: string;
}

const DragnDrop: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAddNote = (newNote: Note) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setIsEditorOpen(false);
  };

  const handleEditNote = (updatedNote: Note) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );
    setIsEditorOpen(false);
    setSelectedNote(null);
  };

  const handleOpenEditor = (note: Note | null) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination || source.index === destination.index) return;

    const reorderedNotes = Array.from(notes);
    const [movedNote] = reorderedNotes.splice(source.index, 1);
    reorderedNotes.splice(destination.index, 0, movedNote);

    setNotes(reorderedNotes);
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <button
        onClick={() => handleOpenEditor(null)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
      >
        Add Note
      </button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-6"
            >
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-gray-800 rounded-md p-4 shadow-md transition-transform duration-100 ${
                        snapshot.isDragging ? "z-50 scale-105" : ""
                      }`}
                    >
                      <div className="relative bg-gray-700 p-4 rounded-md transition-transform duration-100">
                        <div className="absolute right-2 top-2">
                          <button onClick={() => handleDeleteNote(note.id)}>
                            <TrashIcon className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                        <div className="font-bold text-lg text-gray-300 mb-2 truncate">
                          {note.header}
                        </div>
                        <div className="text-gray-200 mb-2 max-h-24 overflow-y-auto break-words">
                          {note.body}
                        </div>
                        <div className="absolute left-2 bottom-2 flex space-x-2">
                          <button onClick={() => handleOpenEditor(note)}>
                            <PencilIcon className="h-5 w-5 text-blue-500" />
                          </button>
                          <button onClick={() => handleViewNote(note)}>
                            <EyeIcon className="h-5 w-5 text-green-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isEditorOpen && (
        <PopupEditor
          note={selectedNote}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

      {selectedNote && !isEditorOpen && (
        <PopupView
          title={selectedNote.header}
          content={selectedNote.body}
          onClose={() => setSelectedNote(null)}
        />
      )}
    </div>
  );
};

export default DragnDrop;
