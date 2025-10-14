"use client";

import { useState } from "react";

interface OrderStatus {
  orderNumber: string;
  customerName: string;
  status: string;
  deliveryDate: string;
  deliveryTime: string;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrderStatus(null);

    try {
      const response = await fetch(`/api/public/orders/${orderId}`);
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "Ocorreu um erro ao buscar seu pedido.",
        );
      }

      setOrderStatus(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white p-8 rounded-lg shadow-md mb-8"
      >
        <h1 className="text-2xl font-bold text-chocolate mb-6">
          Acompanhar Pedido
        </h1>
        <div className="mb-4">
          <label htmlFor="orderId" className="block text-chocolate mb-1">
            Número do Pedido
          </label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Insira o número do seu pedido"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pastel-pink text-chocolate font-bold py-3 px-4 rounded hover:bg-opacity-80 transition-colors disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar Pedido"}
        </button>
      </form>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Erro: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {orderStatus && (
        <div className="bg-white p-8 rounded-lg shadow-md animate-fade-in">
          <h2 className="text-xl font-bold text-chocolate mb-4">
            Detalhes do Pedido
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Número:</strong> {orderStatus.orderNumber}
            </p>
            <p>
              <strong>Cliente:</strong> {orderStatus.customerName}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span className="font-semibold text-pastel-pink">
                {orderStatus.status}
              </span>
            </p>
            <p>
              <strong>Data de Entrega:</strong> {orderStatus.deliveryDate}
            </p>
            <p>
              <strong>Hora de Entrega:</strong> {orderStatus.deliveryTime}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
