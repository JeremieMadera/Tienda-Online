import { useState } from "react";
import { createProduct, updateProduct } from "../../services/productsApi";
import I8 from "../../shared/components/I8/I8";
import "./AdminDashboard.css";

export default function ProductFormModal({ product, onClose, onSuccess }) {
  const isEditing = !!product;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category || "",
    subcategory: product?.subcategory || "",
    image_url: product?.image || "",
    badge: product?.badge || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        badge: formData.badge === "" ? null : formData.badge,
      };

      if (isEditing) {
        await updateProduct(product.id, payload);
      } else {
        await createProduct(payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal-content">
        <button className="admin-modal-close" onClick={onClose}>
          <I8 name="cancel" size={24} />
        </button>
        <h2>{isEditing ? "Edit Product" : "New Product"}</h2>

        {error && <div className="admin-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-group">
            <label>Name</label>
            <input name="name" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="admin-form-group">
            <label>Price ($)</label>
            <input type="number" step="0.01" min="0" name="price" required value={formData.price} onChange={handleChange} />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Category</label>
              <input name="category" required value={formData.category} onChange={handleChange} />
            </div>
            <div className="admin-form-group">
              <label>Subcategory</label>
              <input name="subcategory" required value={formData.subcategory} onChange={handleChange} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Image URL</label>
            <input name="image_url" required type="url" value={formData.image_url} onChange={handleChange} />
          </div>

          <div className="admin-form-group">
            <label>Badge (Optional)</label>
            <select name="badge" value={formData.badge} onChange={handleChange}>
              <option value="">None</option>
              <option value="New">New</option>
              <option value="Trending">Trending</option>
              <option value="Sale">Sale</option>
            </select>
          </div>

          <button type="submit" className="admin-btn-primary" disabled={loading}>
            {loading ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
