export function makeIdGenerator(prefix: string) {
  let idIndex = 0;
  return () => {
    return `${prefix}-${idIndex++}`;
  };
}
