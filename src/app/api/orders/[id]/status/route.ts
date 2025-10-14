import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/app/api/types";
import { orders } from "@/app/api/db";

const validStatus = [
  "pending",
  "confirmed",
  "production",
  "ready",
  "delivered",
  "cancelled",
];

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  {
    const order = orders.find((o) => o.id === id);

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

    const { status } = await request.json();

    if (!status || !validStatus.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Status inválido", code: "INVALID_STATUS" },
        { status: 400 },
      );
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Status do pedido atualizado com sucesso",
      data: order,
    });
  }
}
