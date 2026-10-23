const mongoose = require("mongoose");

const designRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    size: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    fileName: {
      type: String,
      default: "",
    },

    filePath: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "reviewing", "quoted", "completed", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DesignRequest", designRequestSchema);