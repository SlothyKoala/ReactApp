import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import PopupEditor from "../components/PopupEditor";
import { XIcon, EyeIcon, PencilIcon, DotsVerticalIcon } from "@heroicons/react/solid";
import '../css/notes.css';

const DragnDrop: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([
    "Note 1: This is a sample note with a lot of content to showcase how the notes appear in the grid layout.",
    "Note 2: Another note with some more text.",
    "Note 3: Here’s a note that has a bit more information to it.",
  ]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [noteToView, setNoteToView] = useState<string | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<number | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newNotes = Array.from(notes);
    const [moved] = newNotes.splice(result.source.index, 1);
    newNotes.splice(result.destination.index, 0, moved);
    setNotes(newNotes);
  };

  const handleAddNote = (note: string) => {
    setNotes([...notes, note]);
  };

  const handleUpdateNote = (updatedNote: string) => {
    if (noteToEdit !== null) {
      const newNotes = [...notes];
      newNotes[noteToEdit] = updatedNote;
      setNotes(newNotes);
      setNoteToEdit(null);
    }
  };

  const handleDeleteNote = (index: number) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-300 smooth-entrance">
      <h1 className="text-3xl font-bold mb-4 text-center">Drag and Drop Notes</h1>
      <button
        onClick={() => {
          setPopupOpen(true);
          setNoteToEdit(null);
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Note
      </button>
      {isPopupOpen && (
        <PopupEditor
          onClose={() => setPopupOpen(false)}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          initialText={noteToEdit !== null ? notes[noteToEdit] : ""}
        />
      )}
      {noteToView && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-md max-w-lg w-full text-gray-200">
            <h2 className="text-xl font-bold mb-4">Note Details</h2>
            <p>{noteToView}</p>
            <button
              onClick={() => setNoteToView(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-2 gap-4 pt-4"
            >
              {notes.map((note, index) => (
                <Draggable key={index} draggableId={`note-${index}`} index={index}>
                  {(provided, snapshot) => {
                    const currentTransform = provided.draggableProps.style?.transform || "";

                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 bg-gray-800 rounded-md shadow-md transition duration-150 cursor-pointer flex justify-between items-center ${
                          snapshot.isDragging ? "shadow-lg" : ""
                        }`}
                        style={{
                          ...provided.draggableProps.style,
                          transform: snapshot.isDragging
                            ? `${currentTransform} translate(0, -60px)`
                            : currentTransform,
                          transition: snapshot.isDragging
                            ? "transform 0.1s ease"
                            : "none",
                        }}
                      >
                        <div className="flex items-center">
                          <DotsVerticalIcon className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="truncate">{note.split(":")[0]}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNoteToView(note);
                            }}
                            className="text-blue-400 hover:text-blue-600"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setNoteToEdit(index);
                              setPopupOpen(true);
                            }}
                            className="text-yellow-500 hover:text-yellow-700"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNote(index);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragnDrop;
