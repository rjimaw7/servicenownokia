const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Ticket",
    },
    text: {
      type: "String",
      required: [true, "Please add some text"],
    },
    isAdmin: {
      type: "String",
      default: "false",
    },
    isAdminId: {
      type: "String",
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
);

module.exports = mongoose.model("Note", noteSchema);
