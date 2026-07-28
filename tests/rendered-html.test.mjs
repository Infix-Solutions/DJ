import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the cinematic DJ Abhishek website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>DJ Abhishek \| DJ, Remixer &amp; Producer<\/title>/i);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /href="#tracks">Tracks<\/a>/);
  assert.match(html, /href="#world">World Tour<\/a>/);
  assert.match(html, /href="#highlights">Highlights<\/a>/);
  assert.match(html, /href="#gallery">Gallery<\/a>/);
  assert.match(html, /href="#booking">Booking<\/a>/);
  assert.match(html, /<span>Sound<\/span><em>in motion\.<\/em>/);
  assert.match(html, /<h2>Bring the/);
});

test("includes the 3D scene, reduced motion, and responsive experience", async () => {
  const [page, scene, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/DeckScene.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /dynamic\(\(\) => import\("\.\/components\/DeckScene"\)/);
  assert.match(page, /ScrollTrigger/);
  assert.match(page, /new Lenis/);
  assert.match(scene, /<Canvas/);
  assert.match(scene, /Turntable/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 580px\)/);
});
