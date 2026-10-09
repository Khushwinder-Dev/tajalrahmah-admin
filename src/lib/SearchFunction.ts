/* eslint-disable @typescript-eslint/no-explicit-any */
export function SearchFunction<T extends Record<string, any>>(
  data: T[],
  query: string,
  keys: (keyof T)[]
): T[] {
  if (!query.trim()) return data;
  const lowerQuery = query.toLowerCase();

  return data.filter((item) =>
    keys.some((key) => {
      const value = item[key];
      return (
        typeof value === "string" && value.toLowerCase().includes(lowerQuery)
      );
    })
  );
}
