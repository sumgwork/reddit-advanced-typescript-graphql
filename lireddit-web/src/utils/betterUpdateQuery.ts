import { Cache, QueryInput } from "@urql/exchange-graphcache";
export function betterUpdateQuery<R, Q>(
  cache: Cache,
  qi: QueryInput,
  result: R,
  fn: (r: R, q: Q) => Q
): void {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}
