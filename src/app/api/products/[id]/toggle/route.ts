import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/app/api/types";
import { products } from "@/app/api/db";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json(
      {
        success: false,
        error: "Produto não encontrado",
        code: "PRODUCT_NOT_FOUND",
      },
      { status: 404 },
    );
  }

  const { isActive } = await request.json();

  if (isActive === undefined || typeof isActive !== "boolean") {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid isActive value",
        code: "INVALID_INPUT",
      },
      { status: 400 },
    );
  }

  product.isActive = isActive;
  product.updatedAt = new Date().toISOString();

  return NextResponse.json({
    success: true,
    message: "Status do produto atualizado",
    data: product,
  });
}
