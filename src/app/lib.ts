// lib/api.ts

interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

function getBaseUrl(): string {
  // Em produção (Vercel) usa variável de ambiente
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Em desenvolvimento
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return "http://localhost:3000";
}

export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {},
): Promise<Response> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${endpoint}`;

  return fetch(url, {
    ...options,
    next: {
      revalidate: options.next?.revalidate ?? 30, // default 30s
      tags: options.next?.tags,
    },
  });
}
