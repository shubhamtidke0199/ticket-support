import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset, closeTicket } from "../features/tickets/ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  getNotes,
  createNote,
  reset as notesReset,
} from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";
import BackButton from "../components/BackButton";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAuthStatus } from './../hooks/useAuthStatus';

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");
function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading,
     isSuccess : notesIsSuccess, isError: notesIsError } = useSelector(
    (state) => state.notes
  );


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const {Admin} = useAuthStatus()

  useEffect(()=>{
    return () => {
        if(isSuccess){
          dispatch(reset())
        }
        if(notesIsSuccess){
          dispatch(notesReset())
        }
    }
    //eslint-disable-next-line
  }, [isSuccess])
  
  // console.log(isLoading);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
 
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    //eslint-disable-next-line
  }, [isError, message, ticketId ]);

  //On ticket close function CLOSE TICKET
  
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    Admin? navigate("/admin/tickets"): navigate("/tickets");
  };
  
  // console.log("Hii");
  
  

  //Crate note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }));
    toast.success("Note created");
    closeModal();
    setTimeout(()=>{
      window.location.reload(false);
    }, 100)
  };

  //Open/Close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);


  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className="ticket-page">
      <header className="ticket-header">
      { Admin?
          <BackButton url="/admin/tickets" /> 
          :( 
        <BackButton url="/tickets" />
      )}
      <div>
        <h2 >
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
      </div>
        <h3>Product : {ticket.product}</h3>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of the Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note{" "}
        </button>
      )}

      {/* //CREATE the Modal element */}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {notesIsError && (<h3>Error fetching notes</h3>)}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
