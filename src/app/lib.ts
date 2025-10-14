// lib/api.ts
import { headers } from "next/headers";

interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

async function getBaseUrl(): Promise<string> {
  // Em produção (Vercel) usa variável de ambiente
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Em desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // Se em um Server Component, tenta pegar dos headers
  try {
    const headersList = await headers();
    const protocol = headersList.get("x-forwarded-proto") || "https";
    const host = headersList.get("x-forwarded-host") || headersList.get("host");
    return `${protocol}://${host}`;
  } catch {
    return "https://localhost:3000";
  }
}

export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {},
): Promise<Response> {
  const baseUrl = await getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  return fetch(url, {
    ...options,
    next: {
      revalidate: options.next?.revalidate ?? 30, // default 30s
      tags: options.next?.tags,
    },
  });
}
