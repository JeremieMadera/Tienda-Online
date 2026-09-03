import { useState } from "react";
import I8 from "../../shared/components/I8/I8";
import "./CheckoutModal.css";

const INITIAL_FORM = {
  firstName: "", lastName: "", email: "", address: "",
  city: "", zip: "", country: "US",
  cardNumber: "", expiry: "", cvv: "",
};

export default function CheckoutModal({ open, onClose, cartItems, onConfirm }) {
  const [step, setStep] = useState("shipping");
  const [form, setForm] = useState(INITIAL_FORM);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 9.99;
  const set = (field, value) => setForm((f) => ({ ...f, [field]: value }));

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
            <button className="checkout-confirmed__btn" onClick={() => { onConfirm(); setStep("shipping"); setForm(INITIAL_FORM); }}>
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

            <div className="checkout-form">
              {step === "shipping" && (
                <>
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
                  <button className="checkout-form__btn checkout-form__btn--full" onClick={() => setStep("payment")}>
                    Continue to Payment
                  </button>
                </>
              )}

              {step === "payment" && (
                <>
                  <h3 className="checkout-form__title">Payment Details</h3>
                  <div><label>Card Number</label><input value={form.cardNumber} onChange={(e) => set("cardNumber", e.target.value)} placeholder="4242 4242 4242 4242" maxLength={19} /></div>
                  <div className="checkout-form__row checkout-form__row--2">
                    <div><label>Expiry Date</label><input value={form.expiry} onChange={(e) => set("expiry", e.target.value)} placeholder="MM / YY" maxLength={7} /></div>
                    <div><label>CVV</label><input value={form.cvv} onChange={(e) => set("cvv", e.target.value)} placeholder="123" maxLength={4} /></div>
                  </div>

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

                  <div className="checkout-form__actions">
                    <button className="checkout-form__btn checkout-form__btn--secondary" onClick={() => setStep("shipping")}>Back</button>
                    <button className="checkout-form__btn checkout-form__btn--primary" onClick={() => setStep("confirmed")}>
                      Place Order — ${total.toFixed(2)}
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
