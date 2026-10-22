import { resolve, relative, isAbsolute, sep } from "node:path";
export function isWithin(root: string, candidate: string): boolean {
  const rel = relative(resolve(root), resolve(candidate));
  return (
    rel === "" ||
    (!isAbsolute(rel) && rel !== ".." && !rel.startsWith(".." + sep))
  );
}
export function resolveWithin(root: string, ...segments: string[]): string {
  const result = resolve(root, ...segments);
  if (!isWithin(root, result)) throw new RangeError("Path escapes root");
  return result;
}
