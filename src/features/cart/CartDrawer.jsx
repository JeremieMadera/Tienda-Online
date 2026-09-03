import I8 from "../../shared/components/I8/I8";
import "./CartDrawer.css";

export default function CartDrawer({ open, onClose, cartItems, onUpdateQty, onRemove, onCheckout }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <>
      <div className={`cart-overlay${open ? " open" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer${open ? " open" : ""}`}>
        <div className="cart-drawer__header">
          <div>
            <h2 className="cart-drawer__title">Your Cart</h2>
            <p className="cart-drawer__count">{cartItems.reduce((s, i) => s + i.quantity, 0)} items</p>
          </div>
          <button className="cart-drawer__close" aria-label="Close cart" onClick={onClose}>
            <I8 name="multiply" size={20} color="17120B" />
          </button>
        </div>

        <div className="cart-drawer__items">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <I8 name="shopping-bag" size={48} color="CEC7BA" style={{ margin: "0 auto" }} />
              <p className="cart-drawer__empty-title">Your cart is empty</p>
              <p className="cart-drawer__empty-sub">Add some pieces to get started.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item__img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__info">
                  <div>
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__size">Size: {item.size}</p>
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-item__qty">
                      <button className="cart-item__qty-btn" onClick={() => onUpdateQty(item.id, -1)}>−</button>
                      <span className="cart-item__qty-num">{item.quantity}</span>
                      <button className="cart-item__qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                    </div>
                    <div className="cart-item__price-row">
                      <span className="cart-item__price">${(item.price * item.quantity).toFixed(2)}</span>
                      <button className="cart-item__remove" aria-label="Remove" onClick={() => onRemove(item.id)}>
                        <I8 name="trash" size={15} color="968C80" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__totals">
              <div className="cart-drawer__row">
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="cart-drawer__row">
                <span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              {subtotal < 150 && (
                <p className="cart-drawer__free-ship">Add ${(150 - subtotal).toFixed(2)} more for free shipping</p>
              )}
              <div className="cart-drawer__total-row">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button className="cart-drawer__checkout-btn" onClick={onCheckout}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
