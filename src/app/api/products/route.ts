import { NextResponse } from "next/server";
import { Product } from "../types";
import { products } from "../db";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const active = searchParams.get("active");

  let filteredProducts = products;

  if (active !== null) {
    const isActive = active === "true";
    filteredProducts = products.filter(
      (product) => product.isActive === isActive,
    );
  }

  return NextResponse.json({
    success: true,
    data: filteredProducts,
    total: filteredProducts.length,
    page: 1, // Mocked for now
  });
}

export async function POST(request: Request) {
  const { name, description, price, imageUrl } = await request.json();

  if (!name || !description || !price) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing required fields",
        code: "INVALID_INPUT",
      },
      { status: 400 },
    );
  }

  const newProduct: Product = {
    id: uuidv4(),
    name,
    description,
    price,
    imageUrl,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  products.push(newProduct);

  return NextResponse.json(
    {
      success: true,
      message: "Produto criado com sucesso",
      data: newProduct,
    },
    { status: 201 },
  );
}
