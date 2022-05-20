const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access PRIVATE
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access PRIVATE
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(ticket);
});

// @desc Create new ticket
// @route POST /api/tickets
// @access PRIVATE
const createTicket = asyncHandler(async (req, res) => {
  const { issue, description, status, priority } = req.body;

  if (!issue || !description || !status || !priority) {
    throw new Error("Please complete all fields");
  }

  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    issue,
    description,
    priority,
    status: "new",
    user: req.user.id,
  });

  res.status(201).json(ticket);
});

// @desc Delete user ticket
// @route DELETE /api/tickets/:id
// @access PRIVATE
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await ticket.remove();

  res.status(200).json({ success: true });
});

// @desc Update ticket
// @route PUT /api/tickets/:id
// @access PRIVATE
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the ID in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(400);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
