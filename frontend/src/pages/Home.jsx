import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="">
        <div className="container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row">
          <div className="flex justify-center xl:w-1/2">
            <img
              className="h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full"
              src="https://images.unsplash.com/photo-1605188378873-3ddf764e6fff?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687"
              alt="hero"
            />
          </div>

          <div className="flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
              Welcome to ServiceNowNokia
            </h2>

            <p className="block max-w-2xl mt-4 text-xl text-gray-500">
              If you are a first-time user, please click on “Sign Up” button
              above and follow on-screen instructions to register and gain
              access to the needed portal.
              <br />
            </p>

            <p className="block max-w-2xl mt-4 text-xl text-gray-500">
              If you are a returning user, please enter your registered
              corporate email address as your username. Nokia internal users are
              requested to use their NOKIA-INTRA credentials to login
              <br />
            </p>

            <div className="mt-6 sm:-mx-2">
              <div className="inline-flex w-full overflow-hidden rounded-lg shadow sm:w-auto sm:mx-2">
                <Link
                  to="/new-ticket"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-600 sm:w-auto"
                >
                  <span className="mx-2">Create new ticket</span>
                </Link>
              </div>

              <div className="inline-flex w-full mt-4 overflow-hidden rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0">
                <Link
                  to="/tickets"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white transition-colors duration-150 transform sm:w-auto bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-600 hover:to-blue-600"
                >
                  <span className="mx-2">View Tickets</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
