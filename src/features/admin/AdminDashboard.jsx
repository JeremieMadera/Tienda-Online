import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productsApi";
import { getAllOrders } from "../../services/ordersApi";
import ProductFormModal from "./ProductFormModal";
import "./AdminDashboard.css";
import "../profile/UserProfile.css"; // Reuse order card styles
import I8 from "../../shared/components/I8/I8";

export default function AdminDashboard({ user }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("catalog"); // "catalog" or "orders"
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    // If user is not admin, kick them out
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      if (activeTab === "catalog") {
        loadProducts();
      } else if (activeTab === "orders") {
        loadOrders();
      }
    }
  }, [user, activeTab]);

  const loadOrders = async () => {
    try {
      setLoadingOrders(true);
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  if (!user || user.role !== "admin") {
    return <div className="admin-loading">Verifying access...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header" style={{ marginBottom: "15px" }}>
        <h1>Admin Dashboard</h1>
        {activeTab === "catalog" && (
          <button className="admin-btn-primary" onClick={handleCreate}>
            + Add Product
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: "20px", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
        <button 
          style={{ background: "none", border: "none", fontSize: "1.1rem", fontWeight: activeTab === "catalog" ? "600" : "400", color: activeTab === "catalog" ? "#17120B" : "#888", cursor: "pointer" }}
          onClick={() => setActiveTab("catalog")}
        >
          Catalog
        </button>
        <button 
          style={{ background: "none", border: "none", fontSize: "1.1rem", fontWeight: activeTab === "orders" ? "600" : "400", color: activeTab === "orders" ? "#17120B" : "#888", cursor: "pointer" }}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      {activeTab === "catalog" ? (
        loading ? (
          <div className="admin-loading">Loading products...</div>
        ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img src={p.image} alt={p.name} className="admin-table-img" />
                  </td>
                  <td>{p.name}</td>
                  <td>${p.price.toFixed(2)}</td>
                  <td>{p.category}</td>
                  <td>
                    <button className="admin-icon-btn edit" onClick={() => handleEdit(p)} title="Edit">
                      <I8 name="edit" size={20} />
                    </button>
                    <button className="admin-icon-btn delete" onClick={() => handleDelete(p.id)} title="Delete">
                      <I8 name="trash" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-no-data">No products in store.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )
      ) : (
        loadingOrders ? (
          <div className="admin-loading">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="admin-no-data">No orders found.</div>
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
                  <strong>Customer ID {order.user_id}:</strong> {order.first_name} {order.last_name} ({order.email})
                  <br />
                  <strong>Ship to:</strong> {order.address}, {order.city}, {order.country}
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
        )
      )}

      {isModalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setIsModalOpen(false);
            loadProducts();
          }}
        />
      )}
    </div>
  );
}
