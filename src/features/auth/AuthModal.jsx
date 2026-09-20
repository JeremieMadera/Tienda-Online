import { useState } from "react";
import I8 from "../../shared/components/I8/I8";
import { login, register } from "../../services/authApi";
import "./AuthModal.css";

export default function AuthModal({ open, onClose, onAuth }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const reset = () => { setEmail(""); setPassword(""); setError(""); };

  const switchMode = (next) => { setMode(next); reset(); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = mode === "login"
        ? await login(email, password)
        : await register(email, password);
      reset();
      onAuth(user);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" aria-label="Close" onClick={onClose}>
          <I8 name="multiply" size={18} color="17120B" />
        </button>

        <h2 className="auth-modal__title">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label className="auth-form__label">Email</label>
            <input
              className="auth-form__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maria@example.com"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="auth-form__label">Password</label>
            <input
              className="auth-form__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="auth-form__error">{error}</p>}

          <button className="auth-form__btn" type="submit" disabled={loading}>
            {loading ? "..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="auth-modal__switch">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          {" "}
          <button
            className="auth-modal__switch-btn"
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Register" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
