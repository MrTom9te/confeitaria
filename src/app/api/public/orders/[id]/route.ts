import { NextResponse } from "next/server";
import { Order } from "@/app/api/types";
import { orders } from "@/app/api/db";

export async function GET(
  request: Request,
  context: { params: { id: string } },
) {
  const { id } = context.params;
  const order = orders.find((o) => o.id === id || o.orderNumber === id);

  if (!order) {
    return NextResponse.json(
      {
        success: false,
        error: "Pedido não encontrado",
        code: "ORDER_NOT_FOUND",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      id: order.id,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      status: order.status,
      deliveryDate: order.deliveryDate,
      deliveryTime: order.deliveryTime,
      updatedAt: order.updatedAt,
    },
  });
}
