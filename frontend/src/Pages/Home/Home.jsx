import React, { useEffect, useState, useCallback } from 'react';
import Navbar from "../../components/navbar";
import NoteCard from "../../components/NoteCard";
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/Toast';
import EmptyCard from '../../components/EmptyCard';
import AddNotesImg from "../../assets/add-notes.png";
import NoDataImg from "../../assets/no-data.png";

// Set app element for react-modal
Modal.setAppElement('#root');

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: false,
      message: "", 
    });

    setTimeout(() => {
      setShowToastMsg({
        isShown: true,
        message,
        type,
      });
    }, 50);
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  const getUserInfo = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  const getAllNotes = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  }, []);

  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", { params: { query } });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, [getAllNotes, getUserInfo]);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="container mx-auto px-4 py-8">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? "Ooops! No notes found matching your search."
                : "Start creating your first note! Click the 'Add' button to write down your thoughts and reminders."
            }
          />
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
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel="Add or Edit Note"
        className="w-11/12 md:w-2/3 lg:w-1/2 max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-y-auto"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
