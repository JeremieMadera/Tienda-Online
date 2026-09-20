const API_URL = "http://localhost:3000";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data = await response.json();

  return data.products.map((product) => ({
    ...product,
    price: Number(product.price),
    image: product.image_url,
  }));
}
