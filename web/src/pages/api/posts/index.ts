// web/src/pages/api/posts/index.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    data.splice(10);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }
};
