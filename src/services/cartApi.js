const API_URL = "http://localhost:3000";

export async function getCart() {
  const res = await fetch(`${API_URL}/cart`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch cart");
  const data = await res.json();
  return data.items;
}

export async function addToCart(productId, size, quantity = 1) {
  const res = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ product_id: productId, size, quantity }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  const data = await res.json();
  return data.items;
}

export async function updateCartItem(itemId, quantity) {
  const res = await fetch(`${API_URL}/cart/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  const data = await res.json();
  return data.items;
}

export async function removeFromCart(itemId) {
  const res = await fetch(`${API_URL}/cart/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to remove cart item");
  const data = await res.json();
  return data.items;
}
