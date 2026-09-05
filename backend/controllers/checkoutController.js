const Stripe = require("stripe");
const Cart = require("../models/Cart");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;
const currency = (process.env.STRIPE_CURRENCY || "usd").toLowerCase();

const normalizeItems = (items) =>
  items.map((item) => ({
    id: String(item.id),
    name: String(item.name || ""),
    price: Number(item.price || 0),
    details: String(item.details || ""),
    quantity: Number(item.quantity || 1),
  }));

const normalizeShippingAddress = (shippingAddress = {}) => ({
  line1: String(shippingAddress.line1 || ""),
  line2: String(shippingAddress.line2 || ""),
  city: String(shippingAddress.city || ""),
  state: String(shippingAddress.state || ""),
  postalCode: String(shippingAddress.postalCode || ""),
  country: String(shippingAddress.country || "US"),
});

const calculateSubtotal = (items) =>
  Number(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

const buildCustomer = (customer = {}) => ({
  fullName: String(customer.fullName || ""),
  email: String(customer.email || ""),
  phone: String(customer.phone || ""),
});

const createCheckoutRecord = async ({
  clerkUserId,
  customer,
  shippingAddress,
  items,
  subtotal,
  shippingFee,
  total,
  paymentMethod,
  paymentStatus,
  status,
  stripePaymentIntentId = "",
}) => {
  return Cart.create({
    clerkUserId,
    customer: buildCustomer(customer),
    shippingAddress: normalizeShippingAddress(shippingAddress),
    items,
    subtotal,
    shippingFee,
    total,
    paymentMethod,
    paymentStatus,
    status,
    stripePaymentIntentId,
  });
};

const createPaymentIntent = async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        message: "Stripe is not configured on the backend.",
      });
    }

    const {
      clerkUserId,
      customer,
      shippingAddress,
      items,
      shippingFee = 0,
      total,
    } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ message: "Clerk user ID is required." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required." });
    }

    const normalizedItems = normalizeItems(items);
    const subtotal = calculateSubtotal(normalizedItems);
    const normalizedShippingFee = Number(Number(shippingFee || 0).toFixed(2));
    const calculatedTotal = Number(
      (subtotal + normalizedShippingFee).toFixed(2)
    );

    const order = await createCheckoutRecord({
      clerkUserId,
      customer,
      shippingAddress,
      items: normalizedItems,
      subtotal,
      shippingFee: normalizedShippingFee,
      total: Number.isFinite(Number(total)) ? calculatedTotal : calculatedTotal,
      paymentMethod: "card",
      paymentStatus: "pending",
      status: "pending_payment",
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(calculatedTotal * 100),
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order._id.toString(),
        clerkUserId,
        paymentMethod: "card",
      },
      receipt_email: customer?.email || undefined,
    });

    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    res.status(201).json({
      message: "Payment intent created.",
      orderId: order._id,
      clientSecret: paymentIntent.client_secret,
      amount: calculatedTotal,
      currency,
    });
  } catch (error) {
    next(error);
  }
};

const createCodOrder = async (req, res, next) => {
  try {
    const {
      clerkUserId,
      customer,
      shippingAddress,
      items,
      shippingFee = 0,
      total,
    } = req.body;

    if (!clerkUserId) {
      return res.status(400).json({ message: "Clerk user ID is required." });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart items are required." });
    }

    const normalizedItems = normalizeItems(items);
    const subtotal = calculateSubtotal(normalizedItems);
    const normalizedShippingFee = Number(Number(shippingFee || 0).toFixed(2));
    const calculatedTotal = Number(
      (subtotal + normalizedShippingFee).toFixed(2)
    );

    const order = await createCheckoutRecord({
      clerkUserId,
      customer,
      shippingAddress,
      items: normalizedItems,
      subtotal,
      shippingFee: normalizedShippingFee,
      total: Number.isFinite(Number(total)) ? calculatedTotal : calculatedTotal,
      paymentMethod: "cod",
      paymentStatus: "cod_pending",
      status: "awaiting_cod",
    });

    res.status(201).json({
      message: "Cash on delivery order created.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

const confirmPayment = async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        message: "Stripe is not configured on the backend.",
      });
    }

    const { orderId, paymentIntentId } = req.body;

    if (!orderId || !paymentIntentId) {
      return res
        .status(400)
        .json({ message: "Order ID and payment intent ID are required." });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (!["succeeded", "processing"].includes(paymentIntent.status)) {
      return res.status(400).json({
        message: "Payment has not completed successfully.",
        status: paymentIntent.status,
      });
    }

    const order = await Cart.findByIdAndUpdate(
      orderId,
      {
        paymentStatus:
          paymentIntent.status === "succeeded" ? "paid" : "pending",
        status:
          paymentIntent.status === "succeeded"
            ? "processing"
            : "pending_payment",
        stripePaymentIntentId: paymentIntent.id,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.json({
      message: "Payment confirmed.",
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPaymentIntent,
  createCodOrder,
  confirmPayment,
};
