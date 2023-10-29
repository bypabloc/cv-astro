// Path: api/tests/math.test.ts

import { describe, expect, it, afterAll } from "bun:test";

const baseUrl = `http://cv_test_api:8000`;

describe("GET Users suite", () => {
  console.log("baseUrl", baseUrl);

  const basePath = "/styles";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  it("GET /", async () => {
    const req = new Request(baseUrl + basePath);
    const res = await fetch(req, {
      headers,
    });
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });

  it("POST /", async () => {
    const body = {
      css: "test",
      name: "test",
      userId: "c4a0b0e0-9f1a-4b1a-8b1a-0b1a0b1a0b1a",
    };
    const req = new Request(baseUrl + basePath, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const res = await fetch(req);
    const json = await res.json();
    console.log("json", json);
    expect(res.status).toEqual(200);
  });

  it("GET /:id", async () => {
    const req = new Request(baseUrl + basePath + "/1");
    const res = await fetch(req, {
      headers,
    });
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });

  it("PUT /:id", async () => {
    const req = new Request(baseUrl + basePath + "/1", {
      method: "PUT",
      headers,
      body: JSON.stringify({ name: "test" }),
    });
    const res = await fetch(req);
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });

  it("DELETE /:id", async () => {
    const req = new Request(baseUrl + basePath + "/1", {
      method: "DELETE",
      headers,
    });
    const res = await fetch(req);
    expect(res.status).toEqual(200);

    const json = await res.json();
    console.log("json", json);
  });
});
