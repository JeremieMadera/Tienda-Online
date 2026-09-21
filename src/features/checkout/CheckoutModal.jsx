import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import I8 from "../../shared/components/I8/I8";
import "./CheckoutModal.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const INITIAL_FORM = {
  firstName: "", lastName: "", email: "", address: "",
  city: "", zip: "", country: "US",
};

// ─── Payment step with Stripe Elements ───────────────────────────────────────
function PaymentStep({ total, cartItems, form, onBack, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const confirmation = await Promise.race([
        stripe.confirmPayment({
          elements,
          confirmParams: { return_url: window.location.href },
          redirect: "if_required",
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Stripe payment confirmation timed out.")), 30000)
        ),
      ]);

      const { error: stripeError, paymentIntent } = confirmation;

      if (stripeError) {
        throw new Error(stripeError.message ?? "Payment failed");
      }

      if (!paymentIntent?.id) {
        throw new Error("Payment was confirmed but no payment reference was returned.");
      }

      await onSuccess(paymentIntent.id);
    } catch (orderError) {
      setError(orderError instanceof Error ? orderError.message : "Payment failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3 className="checkout-form__title">Payment Details</h3>

      <div className="checkout-summary">
        <h4 className="checkout-summary__title">Order Summary</h4>
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.size}`} className="checkout-summary__row">
            <span>{item.name} × {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-summary__total">
          <span>Total</span><span>${total.toFixed(2)}</span>
        </div>
      </div>

      <PaymentElement />

      {error && <p style={{ color: "#c0392b", fontFamily: "var(--font-sans)", fontSize: 13 }}>{error}</p>}

      <div className="checkout-form__actions">
        <button type="button" className="checkout-form__btn checkout-form__btn--secondary" onClick={onBack}>Back</button>
        <button type="submit" className="checkout-form__btn checkout-form__btn--primary" disabled={!stripe || loading}>
          {loading ? "Processing..." : `Place Order — $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export default function CheckoutModal({ open, onClose, cartItems, onConfirm }) {
  const [step, setStep] = useState("shipping");
  const [form, setForm] = useState(INITIAL_FORM);
  const [clientSecret, setClientSecret] = useState(null);
  const [loadingIntent, setLoadingIntent] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 9.99;
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleContinueToPayment = async () => {
    if (Object.values(form).some((value) => !value.trim())) {
      alert("Please complete all shipping fields.");
      return;
    }

    setLoadingIntent(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("http://localhost:3000/payment/create-intent", {
        method: "POST",
        credentials: "include",
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to initialize payment");
      if (data.amount !== Math.round(total * 100)) {
        throw new Error("El carrito ha cambiado. Por favor, cierra esta ventana y refresca la página.");
      }
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err) {
      alert(err.name === "AbortError" ? "Payment initialization timed out." : err.message);
    } finally {
      clearTimeout(timeout);
      setLoadingIntent(false);
    }
  };

  if (!open) return null;

  return (
    <div className="checkout-backdrop">
      <div className="checkout-modal">
        <button className="checkout-modal__close" aria-label="Close" onClick={onClose}>
          <I8 name="multiply" size={18} color="17120B" />
        </button>

        {step === "confirmed" ? (
          <div className="checkout-confirmed">
            <div className="checkout-confirmed__icon">
              <I8 name="checked" size={32} color="8C5F34" />
            </div>
            <h2 className="checkout-confirmed__title">Order Confirmed</h2>
            <p className="checkout-confirmed__desc">
              Thank you, {form.firstName || "valued customer"}! Your order has been placed and will be dispatched within 24 hours.
            </p>
            <p className="checkout-confirmed__email">
              A confirmation has been sent to {form.email || "your email"}.
            </p>
            <button className="checkout-confirmed__btn" onClick={() => { onConfirm(); setStep("shipping"); setForm(INITIAL_FORM); setClientSecret(null); }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="checkout-progress">
              {["Shipping", "Payment"].map((label, i) => {
                const active = label.toLowerCase() === step;
                const done = label === "Shipping" && step === "payment";
                return (
                  <div key={label} style={{ display: "flex", alignItems: "center", flex: i === 0 ? "auto" : undefined }}>
                    <div className="checkout-progress__step">
                      <div className={`checkout-progress__num${active || done ? (done ? " done" : " active") : ""}`}>
                        {done ? "✓" : i + 1}
                      </div>
                      <span className={`checkout-progress__label${active ? " active" : ""}`}>{label}</span>
                    </div>
                    {i === 0 && <div className={`checkout-progress__line${done ? " done" : ""}`} />}
                  </div>
                );
              })}
            </div>

            {step === "shipping" && (
              <div className="checkout-form">
                <h3 className="checkout-form__title">Shipping Information</h3>
                <div className="checkout-form__row checkout-form__row--2">
                  <div><label>First Name</label><input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="Maria" /></div>
                  <div><label>Last Name</label><input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="García" /></div>
                </div>
                <div><label>Email Address</label><input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="maria@example.com" /></div>
                <div><label>Street Address</label><input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Calle Mayor 42" /></div>
                <div className="checkout-form__row checkout-form__row--3">
                  <div><label>City</label><input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Madrid" /></div>
                  <div><label>ZIP Code</label><input value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="28001" /></div>
                  <div>
                    <label>Country</label>
                    <select value={form.country} onChange={(e) => set("country", e.target.value)}>
                      <option value="US">United States</option>
                      <option value="ES">Spain</option>
                      <option value="MX">Mexico</option>
                      <option value="GB">United Kingdom</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
                <button className="checkout-form__btn checkout-form__btn--full" onClick={handleContinueToPayment} disabled={loadingIntent}>
                  {loadingIntent ? "Loading..." : "Continue to Payment"}
                </button>
              </div>
            )}

            {step === "payment" && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "flat", variables: { colorPrimary: "#17120B", fontFamily: "Inter, system-ui, sans-serif" } } }}>
                <PaymentStep
                  total={total}
                  cartItems={cartItems}
                  form={form}
                  onBack={() => setStep("shipping")}
                  onSuccess={async (paymentIntentId) => {
                    const response = await fetch("http://localhost:3000/payment/create-order", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify({
                        paymentIntentId,
                        ...form,
                      }),
                    });
                    const data = await response.json();
                    if (!response.ok) {
                      throw new Error(data.error ?? "Failed to create order");
                    }
                    setStep("confirmed");
                  }}
                />
              </Elements>
            )}
          </>
        )}
      </div>
    </div>
  );
}
