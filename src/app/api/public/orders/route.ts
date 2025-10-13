import { NextResponse } from "next/server";
import { Order, Product } from "@/app/api/types";
import { orders, products } from "@/app/api/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const {
    customerName,
    customerPhone,
    productId,
    quantity,
    deliveryDate,
    deliveryTime,
    observations,
  } = await request.json();

  if (
    !customerName ||
    !customerPhone ||
    !productId ||
    !quantity ||
    !deliveryDate ||
    !deliveryTime
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields",
        code: "INVALID_INPUT",
      },
      { status: 400 },
    );
  }

  const product = products.find((p) => p.id === productId && p.isActive);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        error: "Produto não encontrado ou inativo",
        code: "PRODUCT_NOT_AVAILABLE",
      },
      { status: 400 },
    );
  }

  const newOrder: Order = {
    id: uuidv4(),
    orderNumber: `PED-${orders.length + 1}`,
    customerName,
    customerPhone,
    productId,
    productName: product.name,
    quantity,
    unitPrice: product.price,
    totalPrice: product.price * quantity,
    deliveryDate,
    deliveryTime,
    observations,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  return NextResponse.json(
    {
      success: true,
      message: "Pedido criado com sucesso",
      data: newOrder,
    },
    { status: 201 },
  );
}
