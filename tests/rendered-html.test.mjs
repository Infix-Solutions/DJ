import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the DJ Abhishek website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>DJ Abhishek \| DJ, Remixer &amp; Producer<\/title>/i);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /href="#story">Story<\/a>/);
  assert.match(html, /href="#shows">Shows<\/a>/);
  assert.match(html, /href="#gallery">Gallery<\/a>/);
  assert.match(html, /href="#sound">Sound<\/a>/);
  assert.match(html, /class="section-index artist-index"/);
  assert.match(html, /Open event gallery/);
  assert.match(html, /Continue on WhatsApp/);
});

test("keeps the requested responsive sizing and artist content", async () => {
  const [page, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /Open-format/);
  assert.match(page, /Guest-first/);
  assert.match(page, /Event-ready/);
  assert.match(css, /\.brand-mark\s*\{\s*width:\s*60px/);
  assert.match(css, /\.nav-links > a:not\(\.nav-cta\)/);
  assert.match(css, /\.artist-index/);
  assert.match(css, /@media \(max-width:\s*580px\)/);
});
