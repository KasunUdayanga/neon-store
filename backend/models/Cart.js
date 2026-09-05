const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    details: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      index: true,
    },
    customer: {
      fullName: {
        type: String,
        default: "",
        trim: true,
      },
      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        default: "",
        trim: true,
      },
    },
    shippingAddress: {
      line1: {
        type: String,
        default: "",
        trim: true,
      },
      line2: {
        type: String,
        default: "",
        trim: true,
      },
      city: {
        type: String,
        default: "",
        trim: true,
      },
      state: {
        type: String,
        default: "",
        trim: true,
      },
      postalCode: {
        type: String,
        default: "",
        trim: true,
      },
      country: {
        type: String,
        default: "US",
        trim: true,
      },
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "cod_pending"],
      default: "pending",
    },
    status: {
      type: String,
      enum: [
        "pending_payment",
        "awaiting_cod",
        "processing",
        "completed",
        "cancelled",
      ],
      default: "pending_payment",
    },
    stripePaymentIntentId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
