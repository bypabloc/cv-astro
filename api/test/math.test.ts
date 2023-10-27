// Path: api/tests/math.test.ts

import { describe, expect, it, afterAll } from "bun:test";

const baseUrl = `http://cv_test_api:8000`;

describe("GET Users suite", () => {
  console.log("baseUrl", baseUrl);

  it("GET with headers -> /test/get", async () => {
    const req = new Request(baseUrl + "/test/get");
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const res = await fetch(req, {
      headers,
    });
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });

  it("GET /", async () => {
    const req = new Request(baseUrl);
    const res = await fetch(req);
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });

  it("GET with params", async () => {
    const req = new Request(baseUrl);
    const params = {
      key1: "value1",
      key2: "value2",
    };
    const url = new URL(req.url);
    url.search = new URLSearchParams(params).toString();
    const res = await fetch(url.toString());
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });

  it("GET with headers", async () => {
    const req = new Request(baseUrl);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    const res = await fetch(req, {
      headers,
    });
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });
});
