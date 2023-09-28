import type { GetStaticPaths } from "astro";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, params }) => {
  const { id } = params;
  const { body } = request;
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts/" + id,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    console.log("url", "https://jsonplaceholder.typicode.com/posts/" + id);
    console.log("data", data);
    return new Response(body, {
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

export const GET: APIRoute = async ({ params, request }) => {
  const { id } = params;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
    const post = await res.json();
    return new Response(JSON.stringify(post), {
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

export const getStaticPaths = (async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    const paths = data.map((post) => {
      return {
        params: { id: post.id.toString() },
        props: { title: post.title },
      };
    });

    return paths;
  } catch (err) {
    console.log(err);
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }
}) satisfies GetStaticPaths;
