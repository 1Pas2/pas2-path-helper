import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import * as api from "../dist/index.js";
test("inside and sibling", () => {
  const root = join(tmpdir(), "pas2-root");
  assert.equal(api.isWithin(root, join(root, "a")), true);
  assert.equal(api.isWithin(root, root + "-other"), false);
});
test("traversal rejected", () =>
  assert.throws(
    () => api.resolveWithin(join(tmpdir(), "root"), "..", "outside"),
    RangeError,
  ));
test("root allowed", () => {
  const root = join(tmpdir(), "root");
  assert.equal(api.resolveWithin(root, "."), root);
});
