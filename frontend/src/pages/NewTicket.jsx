import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  // eslint-disable-next-line
  const [name, setName] = useState(user.name);
  // eslint-disable-next-line
  const [email, setEmail] = useState(user.email);
  const [issue, setIssue] = useState("Other");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  // eslint-disable-next-line
  const [status, setStatus] = useState("new");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createTicket({
        issue,
        description,
        priority,
        status,
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center bg-white  space-y-10 py-12 px-4 sm:px-6 lg:px-8">
        <BackButton url="/" />
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-black">
            Create New Ticket
          </h1>
        </div>
        <div className="max-w-md w-full mx-auto bg-white border border-black shadow rounded-lg p-7 space-y-6">
          <div className="flex flex-col">
            <label
              className="text-sm font-bold text-gray-600 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border rounded-md bg-white px-3 py-2"
              type="text"
              value={name}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-sm font-bold text-gray-600 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="border rounded-md bg-white px-3 py-2"
              type="text"
              value={email}
              disabled
            />
          </div>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col">
              <div className="">
                <label
                  htmlFor="issue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Issue Template
                </label>
                <select
                  name="issue"
                  id="issue"
                  className="w-full rounded-md px-4 py-2 mt-1 text-sm outline-none border-2 border-gray-200 focus:border-black mb-2 cursor-pointer"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                >
                  <option value="Account Password Reset">
                    Account Password Reset
                  </option>
                  <option value="Computer VPN Concern">
                    Computer VPN Concern
                  </option>
                  <option value="Nokia Phone or Sim Card Issue">
                    Nokia Phone or Sim Card Issue
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
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
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <br />
            <div>
              <button className="w-full bg-black text-white rounded-md p-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default NewTicket;
