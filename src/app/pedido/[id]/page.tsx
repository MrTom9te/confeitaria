"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function OrderPage() {
  const params = useParams();
  const productId = params.id;

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [observations, setObservations] = useState("");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrderNumber(null);

    const orderData = {
      productId,
      customerName,
      customerPhone,
      quantity,
      deliveryDate,
      deliveryTime,
      observations,
    };

    setLoading(true);

    try {
      const response = await fetch("/api/public/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Falha ao criar o pedido.");
      }

      setOrderNumber(result.data.orderNumber);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderNumber) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-bold text-chocolate mb-4">
          Pedido Recebido!
        </h2>
        <p className="text-gray-700">
          Obrigado pelo seu pedido, {customerName}!
        </p>
        <p className="mt-4">O número do seu pedido é:</p>
        <p className="text-2xl font-bold text-pastel-pink mt-2">
          {orderNumber}
        </p>
        <p className="mt-4 text-sm text-gray-600">
          Guarde este número para acompanhar o status da sua entrega.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h1 className="text-2xl font-bold text-chocolate mb-6">
        Finalizar Pedido
      </h1>

      <div className="mb-4">
        <label htmlFor="customerName" className="block text-chocolate mb-1">
          Nome Completo
        </label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="customerPhone" className="block text-chocolate mb-1">
          Telefone (WhatsApp)
        </label>
        <input
          type="tel"
          id="customerPhone"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="block text-chocolate mb-1">
          Quantidade
        </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 border rounded"
          min="1"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="deliveryDate" className="block text-chocolate mb-1">
            Data de Entrega
          </label>
          <input
            type="date"
            id="deliveryDate"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryTime" className="block text-chocolate mb-1">
            Hora de Entrega
          </label>
          <input
            type="text"
            id="deliveryTime"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="ex: 14h30"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="observations" className="block text-chocolate mb-1">
          Observações (opcional)
        </label>
        <textarea
          id="observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-pastel-pink text-chocolate font-bold py-3 px-4 rounded hover:bg-opacity-80 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Enviando..." : "Confirmar Pedido"}
      </button>
    </form>
  );
}
