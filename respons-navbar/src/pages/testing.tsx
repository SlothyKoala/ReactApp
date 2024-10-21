// const handleDragEnd = (result: DropResult) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     const reorderedNotes = Array.from(notes);
//     const [removed] = reorderedNotes.splice(source.index, 1);
//     reorderedNotes.splice(destination.index, 0, removed);

//     setNotes(reorderedNotes);
//   };