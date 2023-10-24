// Path: api/tests/math.test.ts

import { describe, expect, it, afterAll } from "bun:test";

const baseUrl = `http://cv_test_api:8000`;

describe("GET Users suite", () => {
  console.log("baseUrl", baseUrl);
  it("should return a list of users successfully", async () => {
    const req = new Request(baseUrl);
    const res = await fetch(req);
    console.log("res", res);
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });
});