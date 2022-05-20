import { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getTicket, closeTicket } from "../features/tickets/ticketSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {
  getNotes,
  createNote,
  // reset as notesReset,
} from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";
import { Dialog, Transition } from "@headlessui/react";

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );

  const { user } = useSelector((state) => state.auth);

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  // eslint-disable-next-line
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
    // eslint-disable-next-line
  }, [isError, message, ticketId]);

  // Close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket Closed");
    navigate("/tickets");
  };

  // Toggle Open/Close Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    toast.success("Note Added");
    closeModal();
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center bg-white  space-y-2 sm:px-6 lg:px-8">
        <BackButton url="/" />
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-black">
            Ticket Details
          </h1>
        </div>
        <div className="max-w-md w-full mx-auto bg-white border border-black shadow rounded-lg p-7 space-y-6">
          <div className="flex flex-col">
            <label
              className="text-sm font-bold text-gray-600 mb-1"
              htmlFor="ticketid"
            >
              Ticket Number
            </label>
            <input
              className="border rounded-md bg-white px-3 py-2"
              type="text"
              value={ticket._id}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-bold text-gray-600 mb-1"
              htmlFor="issue"
            >
              Issue
            </label>
            <input
              className="border rounded-md bg-white px-3 py-2"
              type="text"
              value={ticket.issue}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <div className="">
              <label
                htmlFor="decription"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-black"
                rows="3"
                placeholder="Brief description of the issue"
                value={ticket.description}
                disabled
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                name="priority"
                id="priority"
                className="w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-black mb-2"
                value={ticket.priority}
                disabled
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                className="w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-black mb-2"
                value={ticket.status}
                disabled
              >
                <option value={ticket.status}>{ticket.status}</option>
              </select>
            </div>
          </div>
          <br />
          <div className="flex">
            {ticket.status !== "closed" && (
              <>
                <button
                  onClick={openModal}
                  className="w-full bg-black text-white rounded-md p-2 mr-2"
                >
                  Add Note
                </button>

                <Transition appear show={modalIsOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <div className="flex justify-between">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                              >
                                Message
                              </Dialog.Title>
                              <button
                                className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                                onClick={closeModal}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-5 h-5 mx-auto"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                            <form onSubmit={onNoteSubmit}>
                              <div className="mt-2">
                                <textarea
                                  name="description"
                                  id="description"
                                  className="w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-black"
                                  rows="3"
                                  placeholder="Add note..."
                                  value={noteText}
                                  onChange={(e) => setNoteText(e.target.value)}
                                ></textarea>
                              </div>

                              <div className="mt-4">
                                <button
                                  type="submit"
                                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>

                <button
                  onClick={onTicketClose}
                  className="w-full bg-black text-white rounded-md p-2"
                >
                  Cancel Ticket
                </button>
              </>
            )}
          </div>
        </div>
      </section>
      <br />
      <section className="bg-white text-black border-t-4 border-gray-100">
        <div className="container max-w-5xl px-4 py-12 mx-auto">
          <div className="grid gap-4 mx-4 sm:grid-cols-12">
            <div className="col-span-12 sm:col-span-3">
              <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-black">
                <h3 className="text-3xl font-semibold">Recent Logs</h3>
                <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">
                  by {user.name}
                </span>
              </div>
            </div>
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              {[...notes].map((note) => (
                <NoteItem key={note._id} note={note} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Ticket;
