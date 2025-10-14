import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-cream shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-chocolate">
          ConfeitApp
        </Link>
        <nav>
          <Link href="/" className="text-chocolate hover:underline mr-4">
            Catálogo
          </Link>
          <Link href="/acompanhar" className="text-chocolate hover:underline">
            Acompanhar Pedido
          </Link>
        </nav>
      </div>
    </header>
  );
}
