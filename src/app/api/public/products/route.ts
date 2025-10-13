import { NextResponse } from "next/server";
import { Product } from "@/app/api/types";
import { products } from "@/app/api/db";

export async function GET(request: Request) {
  const activeProducts = products.filter((product) => product.isActive);

  return NextResponse.json({
    success: true,
    data: activeProducts,
    total: activeProducts.length,
    page: 1, // Mocked for now
  });
}
