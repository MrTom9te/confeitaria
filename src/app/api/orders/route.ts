import { NextResponse } from "next/server";
import { Order } from "@/app/api/types";
import { orders } from "../db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let filteredOrders = orders;

  if (status) {
    filteredOrders = orders.filter((order) => order.status === status);
  }

  return NextResponse.json({
    success: true,
    data: filteredOrders,
    total: filteredOrders.length,
    page: 1, // Mocked for now
  });
}
