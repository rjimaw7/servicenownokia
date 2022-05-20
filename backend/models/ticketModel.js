const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    issue: {
      type: "String",
      required: [true, "Please select your issue on our sample template"],
      enum: [
        "Account Password Reset",
        "Computer VPN Concern",
        "Nokia Phone or Sim Card Issue",
        "Other",
      ],
    },
    description: {
      type: "String",
      required: [true, "Please enter the description of your issue"],
      unique: true,
    },
    priority: {
      type: "String",
      required: false,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    status: {
      type: "String",
      required: false,
      enum: ["new", "active", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
