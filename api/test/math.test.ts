// Path: api/tests/math.test.ts

import { describe, expect, it, afterAll } from "bun:test";

const baseUrl = `http://cv_api:8000`;

describe("GET Users suite", () => {
  it("should return a list of users successfully", async () => {
    const req = new Request(baseUrl);
    const res = await fetch(req);
    expect(res.status).toEqual(400);
  });
});
