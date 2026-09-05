"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useCart } from "../../context/CartContext";
import {
  ArrowRight,
  CreditCard,
  Lock,
  Package,
  ShieldCheck,
} from "lucide-react";

const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = stripePublishableKey
  ? loadStripe(stripePublishableKey)
  : null;

type ShippingFormState = {
  fullName: string;
  email: string;
  phone: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type PaymentSession = {
  clientSecret: string;
  orderId: string;
};

type PaymentMethod = "card" | "cod";

type CompletedOrder = {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: ShippingFormState;
  paymentMethod: PaymentMethod;
  total: number;
};

const emptyShippingForm: ShippingFormState = {
  fullName: "",
  email: "",
  phone: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

function CardPaymentForm({
  backendUrl,
  orderId,
  onComplete,
}: Readonly<{
  backendUrl: string;
  orderId: string;
  onComplete: () => Promise<void> | void;
}>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePaymentSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${globalThis.location?.origin || ""}/checkout`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed.");
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent?.id) {
      try {
        const response = await fetch(`${backendUrl}/api/checkout/confirm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            paymentIntentId: paymentIntent.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Unable to confirm payment.");
        }

        await onComplete();
      } catch (confirmError) {
        setErrorMessage(
          confirmError instanceof Error
            ? confirmError.message
            : "Unable to confirm payment."
        );
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handlePaymentSubmit} className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/60">
        <PaymentElement />
      </div>

      {errorMessage && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-6 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Lock size={18} />
        {isSubmitting ? "Processing payment..." : "Pay now"}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, cartCount, cartTotal, clearCart } = useCart();
  const { isLoaded, isSignedIn, userId } = useAuth();
  const router = useRouter();
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const [shippingForm, setShippingForm] =
    useState<ShippingFormState>(emptyShippingForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(
    null
  );
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [isCreatingCod, setIsCreatingCod] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CompletedOrder | null>(
    null
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const subtotal = cartTotal;
  const shippingFee = 0;
  const total = Number((subtotal + shippingFee).toFixed(2));

  const handleShippingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setShippingForm((current) => ({
      ...current,
      [name]: value,
    }));

    setPaymentSession(null);
  };

  const buildCompletedOrder = (
    orderId: string,
    paymentMethodValue: PaymentMethod
  ): CompletedOrder => ({
    orderId,
    customerName: shippingForm.fullName,
    email: shippingForm.email,
    phone: shippingForm.phone,
    shippingAddress: { ...shippingForm },
    paymentMethod: paymentMethodValue,
    total,
  });

  const finishOrder = (order: CompletedOrder) => {
    clearCart();
    setPaymentSession(null);
    setCompletedOrder(order);
    setStatusMessage("");
    setErrorMessage("");
  };

  const createCodOrder = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!isSignedIn || !userId) {
      router.push("/sign-in?redirect_url=/checkout");
      return;
    }

    setIsCreatingCod(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch(`${backendUrl}/api/checkout/cod`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkUserId: userId,
          customer: {
            fullName: shippingForm.fullName,
            email: shippingForm.email,
            phone: shippingForm.phone,
          },
          shippingAddress: {
            line1: shippingForm.line1,
            line2: shippingForm.line2,
            city: shippingForm.city,
            state: shippingForm.state,
            postalCode: shippingForm.postalCode,
            country: shippingForm.country,
          },
          items,
          shippingFee,
          total,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to place COD order.");
      }

      finishOrder(buildCompletedOrder(payload.order?._id || "pending", "cod"));
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to place COD order."
      );
    } finally {
      setIsCreatingCod(false);
    }
  };

  const validateForm = () => {
    if (!shippingForm.fullName.trim()) return "Full name is required.";
    if (!shippingForm.email.trim()) return "Email is required.";
    if (!shippingForm.line1.trim()) return "Address line 1 is required.";
    if (!shippingForm.city.trim()) return "City is required.";
    if (!shippingForm.state.trim()) return "State is required.";
    if (!shippingForm.postalCode.trim()) return "Postal code is required.";
    return "";
  };

  const createPaymentIntent = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (!isSignedIn || !userId) {
      router.push("/sign-in?redirect_url=/checkout");
      return;
    }

    setIsCreatingPayment(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      const response = await fetch(
        `${backendUrl}/api/checkout/payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkUserId: userId,
            customer: {
              fullName: shippingForm.fullName,
              email: shippingForm.email,
              phone: shippingForm.phone,
            },
            shippingAddress: {
              line1: shippingForm.line1,
              line2: shippingForm.line2,
              city: shippingForm.city,
              state: shippingForm.state,
              postalCode: shippingForm.postalCode,
              country: shippingForm.country,
            },
            items,
            shippingFee,
            total,
          }),
        }
      );

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Unable to create payment intent.");
      }

      setPaymentSession({
        clientSecret: payload.clientSecret,
        orderId: payload.orderId,
      });
      setStatusMessage(
        "Secure card payment is ready. Apple Pay and Google Pay appear automatically on supported devices."
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to start payment."
      );
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const handleCardOrderComplete = async () => {
    if (!paymentSession) {
      return;
    }

    finishOrder(buildCompletedOrder(paymentSession.orderId, "card"));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 text-black dark:bg-dark-bg dark:text-white">
        <Navbar />
        <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6 pt-28">
          <p className="text-lg text-gray-500 dark:text-gray-300">
            Loading checkout...
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-50 text-black dark:bg-dark-bg dark:text-white">
        <Navbar />
        <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 pt-28">
          <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-950/70">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Sign in to continue
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Your cart is ready. Sign in with Clerk and you will return to
              checkout automatically.
            </p>
            <Link
              href="/sign-in?redirect_url=/checkout"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-neon-pink px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600"
            >
              Continue to sign in
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-slate-50 text-black dark:bg-dark-bg dark:text-white">
        <Navbar />

        <main className="mx-auto max-w-6xl px-6 pb-24 pt-28">
          <div className="mb-10 rounded-[2rem] border border-neon-pink/20 bg-white p-8 shadow-xl dark:border-neon-pink/30 dark:bg-zinc-950/80 md:p-10">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-neon-pink/10 px-4 py-2 text-sm font-semibold text-neon-pink">
              <ShieldCheck size={16} />
              Payment complete
            </p>
            <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white md:text-5xl">
              Hello, {completedOrder.customerName || "customer"}!
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
              Your order has been received successfully. We are preparing your
              neon sign and shipping details are now on file.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
            <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Package className="text-neon-pink" size={22} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shipping dashboard
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Order ID
                  </p>
                  <p className="mt-1 font-bold text-gray-900 dark:text-white">
                    {completedOrder.orderId}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Payment method
                  </p>
                  <p className="mt-1 font-bold text-gray-900 dark:text-white">
                    {completedOrder.paymentMethod === "card"
                      ? "Secure card payment"
                      : "Cash on Delivery"}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </p>
                  <p className="mt-1 font-bold text-gray-900 dark:text-white">
                    {completedOrder.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="mt-1 font-bold text-gray-900 dark:text-white">
                    {completedOrder.phone || "Not provided"}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
                <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Shipping address
                </p>
                <p className="mt-3 text-base font-medium text-gray-900 dark:text-white">
                  {completedOrder.shippingAddress.fullName}
                  <br />
                  {completedOrder.shippingAddress.line1}
                  {completedOrder.shippingAddress.line2
                    ? `, ${completedOrder.shippingAddress.line2}`
                    : ""}
                  <br />
                  {completedOrder.shippingAddress.city},{" "}
                  {completedOrder.shippingAddress.state}
                  <br />
                  {completedOrder.shippingAddress.postalCode}
                  <br />
                  {completedOrder.shippingAddress.country}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-neon-pink px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600"
                >
                  Continue shopping
                  <ArrowRight size={18} />
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setCompletedOrder(null);
                    setPaymentMethod("card");
                    setStatusMessage("");
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 font-bold text-gray-900 transition-all duration-300 hover:-translate-y-1 hover:border-neon-pink hover:text-neon-pink dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                >
                  Back to checkout
                </button>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  What happens next
                </h3>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  <li>• We are preparing your sign for production.</li>
                  <li>• Shipping details have been saved with your order.</li>
                  <li>
                    • You will be contacted if we need any design confirmation.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/80 md:p-8">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <ShieldCheck className="text-neon-pink" size={22} />
                  <h3 className="text-xl font-bold">Customer greeting</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Thanks for ordering with Neon Sign Creator,{" "}
                  {completedOrder.customerName || "friend"}. We appreciate your
                  trust and will keep your order moving.
                </p>
              </div>
            </aside>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-black dark:bg-dark-bg dark:text-white">
        <Navbar />
        <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 pt-28">
          <div className="w-full rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl dark:border-zinc-800 dark:bg-zinc-950/70">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              Your cart is empty
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Add a neon sign to your cart first, then come back to checkout.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-neon-pink px-6 py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600"
            >
              Browse products
              <ArrowRight size={18} />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const cardPaymentReady =
    paymentMethod === "card" && paymentSession && stripePromise;
  let paymentActionContent: ReactNode;

  if (paymentMethod === "cod") {
    paymentActionContent = (
      <button
        type="button"
        onClick={createCodOrder}
        disabled={isCreatingCod}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-6 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isCreatingCod ? "Creating COD order..." : "Place COD order"}
      </button>
    );
  } else if (cardPaymentReady) {
    paymentActionContent = (
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentSession.clientSecret,
          appearance: {
            theme: "stripe",
          },
        }}
      >
        <CardPaymentForm
          backendUrl={backendUrl}
          orderId={paymentSession.orderId}
          onComplete={handleCardOrderComplete}
        />
      </Elements>
    );
  } else {
    paymentActionContent = (
      <button
        type="button"
        onClick={createPaymentIntent}
        disabled={isCreatingPayment}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-neon-pink px-6 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CreditCard size={18} />
        {isCreatingPayment
          ? "Preparing secure payment..."
          : "Continue secure payment"}
      </button>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-black dark:bg-dark-bg dark:text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-28">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-pink/20 bg-neon-pink/10 px-4 py-2 text-sm font-semibold text-neon-pink">
            <ShieldCheck size={16} />
            Secure checkout
          </p>
          <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white md:text-6xl">
            Complete your order
          </h1>
          <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Add shipping details, then continue to secure card payment. Stripe
            will automatically surface Apple Pay and Google Pay where supported.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-8">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Package className="text-neon-pink" size={22} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shipping details
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="fullName"
                  value={shippingForm.fullName}
                  onChange={handleShippingChange}
                  placeholder="Full name"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="email"
                  value={shippingForm.email}
                  onChange={handleShippingChange}
                  placeholder="Email address"
                  type="email"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="phone"
                  value={shippingForm.phone}
                  onChange={handleShippingChange}
                  placeholder="Phone number"
                  type="tel"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="line1"
                  value={shippingForm.line1}
                  onChange={handleShippingChange}
                  placeholder="Address line 1"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="line2"
                  value={shippingForm.line2}
                  onChange={handleShippingChange}
                  placeholder="Address line 2"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white md:col-span-2"
                />
                <input
                  name="city"
                  value={shippingForm.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="state"
                  value={shippingForm.state}
                  onChange={handleShippingChange}
                  placeholder="State / Province"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="postalCode"
                  value={shippingForm.postalCode}
                  onChange={handleShippingChange}
                  placeholder="Postal code"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
                <input
                  name="country"
                  value={shippingForm.country}
                  onChange={handleShippingChange}
                  placeholder="Country"
                  className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-neon-pink dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <CreditCard className="text-neon-pink" size={22} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Secure payment
                </h2>
              </div>

              <div className="mb-6 grid gap-3 md:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("card");
                    setPaymentSession(null);
                    setStatusMessage("");
                  }}
                  className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                    paymentMethod === "card"
                      ? "border-neon-pink bg-neon-pink/5"
                      : "border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <p className="font-bold text-gray-900 dark:text-white">
                    Secure card payment
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Apple Pay and Google Pay are included when supported.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPaymentMethod("cod");
                    setPaymentSession(null);
                    setStatusMessage("");
                  }}
                  className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                    paymentMethod === "cod"
                      ? "border-neon-pink bg-neon-pink/5"
                      : "border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900"
                  }`}
                >
                  <p className="font-bold text-gray-900 dark:text-white">
                    Cash on Delivery
                  </p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Place the order now and pay when it is delivered.
                  </p>
                </button>
              </div>

              {errorMessage && (
                <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
                  {errorMessage}
                </p>
              )}

              {statusMessage && (
                <p className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
                  {statusMessage}
                </p>
              )}

              <div className="mt-6">{paymentActionContent}</div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order summary
              </h2>

              <div className="mt-6 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 dark:border-zinc-800"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-600 dark:border-zinc-800 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900 dark:border-zinc-800 dark:text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 md:p-8">
              <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                <ShieldCheck className="text-neon-pink" size={22} />
                <h3 className="text-xl font-bold">Payment notes</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Apple Pay and Google Pay are shown automatically by Stripe when
                the device, browser, and Stripe account support them.
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
