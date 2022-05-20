import React from "react";
import { Link } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <>
      <tbody className="divide-y divide-gray-100">
        <tr>
          <td className="sticky left-0 p-4 bg-white">
            <label className="sr-only" htmlFor="row_1">
              Row 1
            </label>
          </td>
          <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
            {ticket.issue}
          </td>
          <td className="p-4 text-gray-700 whitespace-nowrap">
            {ticket.status === "new" ? (
              <strong className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium">
                {ticket.status}
              </strong>
            ) : (
              <strong className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded text-xs font-medium">
                {ticket.status}
              </strong>
            )}
          </td>
          <td className="p-4 text-gray-700 whitespace-nowrap">
            {ticket.priority}
          </td>
          <td className="p-4 text-gray-700 whitespace-nowrap">
            {ticket.createdAt}
          </td>
          <td className="p-4 text-gray-700 whitespace-nowrap">
            <Link
              to={`/ticket/${ticket._id}`}
              className="bg-black text-white px-3 py-1.5 rounded text-xs font-medium"
            >
              View details
            </Link>
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default TicketItem;
