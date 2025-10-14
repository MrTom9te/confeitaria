import { NextResponse } from "next/server";
import { Product } from "@/app/api/types";
import { products } from "@/app/api/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product = products.find((p) => p.id === params.id);

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

  return NextResponse.json({ success: true, data: product });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product = products.find((p) => p.id === params.id);

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

  const { name, description, price, imageUrl } = await request.json();

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (imageUrl) product.imageUrl = imageUrl;

  product.updatedAt = new Date().toISOString();

  return NextResponse.json({
    success: true,
    message: "Produto atualizado com sucesso",
    data: product,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        error: "Produto não encontrado",
        code: "PRODUCT_NOT_FOUND",
      },
      { status: 404 },
    );
  }

  products.splice(productIndex, 1);

  return NextResponse.json({
    success: true,
    message: "Produto deletado com sucesso",
  });
}
