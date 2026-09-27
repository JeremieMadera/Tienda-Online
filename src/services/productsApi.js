const API_URL = "http://localhost:3000";

export async function getProducts(page = 1, limit = 10, category = "", search = "") {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("limit", limit);
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const response = await fetch(`${API_URL}/products?${params.toString()}`, { credentials: "include" });

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data = await response.json();

  return {
    ...data,
    products: data.products.map((product) => ({
      ...product,
      price: Number(product.price),
      image: product.image_url,
    })),
  };
}

export async function createProduct(productData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
}

export async function updateProduct(id, productData) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete product");
}
