import ProductCard from "@/components/ProductCard";

// Define the expected shape of a Product
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

async function getProducts(): Promise<Product[]> {
  try {
    // The API is running on the same host, but we specify the port for clarity
    const res = await fetch("/api/public/products", {
      next: { revalidate: 30 }, // Revalidate cache every 60 seconds
    });

    if (!res.ok) {
      // Log the error for debugging on the server
      console.error("Failed to fetch products:", await res.text());
      // Return an empty array to prevent the page from crashing
      return [];
    }

    const response = await res.json();

    // According to the spec, the products are in the 'data' property
    return response.data || [];
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    // In case of a network error or other issue, return an empty array
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-chocolate mb-8">Nosso Catálogo</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-chocolate">
            Não foi possível carregar os produtos no momento.
          </p>
          <p className="text-gray-600 mt-2">
            Por favor, tente novamente mais tarde.
          </p>
        </div>
      )}
    </div>
  );
}
