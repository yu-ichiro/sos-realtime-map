export const groupBy = <K, V>(
  array: readonly V[],
  getKey: (cur: V, idx: number, src: readonly V[]) => K
): [K, V[]][] =>
  Array.from(
    array.reduce((map, cur, idx, src) => {
      const key = getKey(cur, idx, src);
      const list = map.get(key);
      if (list) list.push(cur);
      else map.set(key, [cur]);
      return map;
    }, new Map<K, V[]>())
  );

export const wrap = <T>(val: T) => () => val;
export const immediate = <T>(val: T) => wrap(val)();

export type EnumKey<E> = keyof E;
export type Default<L> = L | "default";
export type DefaultedKey<E> = Default<EnumKey<E>>;
