const Cart = require("../models/Cart");

const checkoutCart = async (req, res, next) => {
  try {
    const {
      clerkUserId,
      items,
      customer = {},
      shippingAddress = {},
    } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ message: "Clerk user ID is required." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required." });
    }

    const normalizedItems = items.map((item) => ({
      id: String(item.id),
      name: String(item.name || ""),
      price: Number(item.price || 0),
      details: String(item.details || ""),
      quantity: Number(item.quantity || 1),
    }));

    const subtotal = Number(
      normalizedItems
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)
    );
    const calculatedTotal = subtotal;

    const cart = await Cart.create({
      clerkUserId,
      customer: {
        fullName: String(customer.fullName || ""),
        email: String(customer.email || ""),
        phone: String(customer.phone || ""),
      },
      shippingAddress: {
        line1: String(shippingAddress.line1 || ""),
        line2: String(shippingAddress.line2 || ""),
        city: String(shippingAddress.city || ""),
        state: String(shippingAddress.state || ""),
        postalCode: String(shippingAddress.postalCode || ""),
        country: String(shippingAddress.country || "US"),
      },
      items: normalizedItems,
      subtotal,
      shippingFee: 0,
      total: calculatedTotal,
      paymentMethod: "cod",
      paymentStatus: "cod_pending",
      status: "awaiting_cod",
    });

    res.status(201).json({
      message: "Checkout saved successfully.",
      cart,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkoutCart };
