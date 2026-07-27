export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
}
