import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../../services/ordersApi";
import "./UserProfile.css";

export default function UserProfile({ user }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      getMyOrders()
        .then((data) => setOrders(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (!user) return <div className="profile-loading">Verifying session...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>My Profile</h1>
        <p>Welcome, {user.email}</p>
      </div>

      <div className="profile-section">
        <h2>Order History</h2>
        {loading ? (
          <p className="profile-loading">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="profile-empty">You haven't made any purchases yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <span className="order-label">Order #{order.id}</span>
                    <span className="order-date">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-total">
                    Total: ${Number(order.total_amount).toFixed(2)}
                  </div>
                </div>
                <div className="order-shipping">
                  <strong>Ship to:</strong> {order.first_name} {order.last_name}, {order.address}, {order.city}, {order.country}
                </div>
                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="item-qty">{item.quantity}x</span>
                      <span className="item-name">{item.product_name}</span>
                      <span className="item-size">Size: {item.size}</span>
                      <span className="item-price">${Number(item.unit_price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
