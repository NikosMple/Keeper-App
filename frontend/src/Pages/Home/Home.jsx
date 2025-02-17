import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import Toast from '../../components/Toast';
import EmptyCard from '../../components/EmptyCard';
import AddNotesImg from "../../assets/add-notes.png";

Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({ isShown: false, type: "add", data: null });
  const [showToastMsg, setShowToastMsg] = useState({ isShown: false, message: "", type: "add" });
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setAllNotes(savedNotes);
  }, []);

  const saveNotesToStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setAllNotes(notes);
  };

  const deleteNote = (noteToDelete) => {
    const updatedNotes = allNotes.filter(note => note.id !== noteToDelete.id);
    saveNotesToStorage(updatedNotes);
    setShowToastMsg({ isShown: true, message: "Note Deleted Successfully", type: 'delete' });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNotes.map((item) => (
              <NoteCard
                key={item.id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                onEdit={() => setOpenAddEditModal({ isShown: true, data: item, type: "edit" })}
                onDelete={() => deleteNote(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={AddNotesImg} message="Start creating your first note!" />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg fixed right-10 bottom-10 transition-all duration-300"
        onClick={() => setOpenAddEditModal({ isShown: true, type: "add", data: null })}
      >
        <MdAdd className="text-3xl" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
        style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
        className="w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          saveNotesToStorage={saveNotesToStorage}
          showToastMessage={(message, type) => setShowToastMsg({ isShown: true, message, type })}
        />
      </Modal>

      <Toast isShown={showToastMsg.isShown} message={showToastMsg.message} type={showToastMsg.type} onClose={() => setShowToastMsg({ isShown: false, message: "" })} />
    </>
  );
};

export default Home;
