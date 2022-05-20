import React from "react";
import { Link } from "react-router-dom";

function BackButton({ url }) {
  return (
    <>
      <Link
        to={url}
        className="border border-black   text-white bg-black px-3.5 py-2 rounded text-xs font-medium ml-5"
      >
        Go Back
      </Link>
    </>
  );
}

export default BackButton;
