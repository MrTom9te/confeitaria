import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(product.price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-chocolate">{product.name}</h3>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-chocolate mt-4">{formattedPrice}</p>
        <Link href={`/pedido/${product.id}`} className="mt-4 inline-block bg-pastel-pink text-chocolate font-bold py-2 px-4 rounded hover:bg-opacity-80 transition-colors">
          Pedir Agora
        </Link>
      </div>
    </div>
  );
}
