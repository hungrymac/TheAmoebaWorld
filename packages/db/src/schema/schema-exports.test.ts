import { describe, expect, it } from "vitest";

import * as schema from "./index";

describe("schema exports", () => {
  it("exposes common tenant tables", () => {
    expect(schema.tenants).toBeDefined();
    expect(schema.profiles).toBeDefined();
  });
});
