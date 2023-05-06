// deno-lint-ignore-file no-explicit-any
export type Resolved<T> = {
  [K in keyof T]: T[K] extends () => any ? ReturnType<T[K]> : T[K];
};

export function unthunk<T>(props: T): Simplify<Resolved<T>> {
  let cache: undefined | Map<string | symbol, any>;
  return new Proxy(props as unknown as Simplify<Resolved<T>>, {
    get: (target, componentName, receiver) => {
      const value = Reflect.get(target, componentName, receiver);
      if (typeof value === "function" && value.length === 0) {
        const x = cache?.get(componentName);
        if (x) {
          return x;
        }
        // lazy initializing of cache can speed up the case if no initializer was called
        if (!cache) cache = new Map();
        const cached = (value as unknown as () => any)();
        cache.set(componentName, cached);
        return cached;
      }
      return value;
    },
  });
}

/**
 * @see https://github.com/ianstormtaylor/superstruct/blob/7973400cd04d8ad92bbdc2b6f35acbfb3c934079/src/utils.ts#L323-L325
 * @see https://twitter.com/JLarky/status/1654708488566898688
 */
export type Simplify<TType> = TType extends any[] | Date
  ? TType
  : { [K in keyof TType]: TType[K] };
