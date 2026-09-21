const API_URL = "http://localhost:3000";

export async function getMyOrders() {
  const response = await fetch(`${API_URL}/orders/me`, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to load orders");
  const data = await response.json();
  return data.orders;
}

export async function getAllOrders() {
  const response = await fetch(`${API_URL}/orders`, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to load all orders");
  const data = await response.json();
  return data.orders;
}
