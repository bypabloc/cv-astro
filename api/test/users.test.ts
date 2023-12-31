// Path: api/test/users.test.ts

import { describe, expect, it, afterAll } from "bun:test";

const baseUrl = `http://cv_test_api:8000`;

describe("GET Users suite", () => {
  console.log("baseUrl", baseUrl);

  const basePath = "/users";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  it("GET all", async () => {
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
      nickname: "byPablo",
      email: "byPablo@gmail.com",
      password: "12345678",
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

  it("GET /", async () => {
    const req = new Request(baseUrl + basePath);
    const res = await fetch(req, {
      headers,
    });
    expect(res.status).toEqual(200);
    console.log("res", res);
  });
});
