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

test("server-renders the cinematic DJ NO-One website", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<title>DJ NO-One \| DJ, Remixer &amp; Producer<\/title>/i);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /href="#tracks">Tracks<\/a>/);
  assert.match(html, /href="#world">Shows<\/a>/);
  assert.match(html, /href="#highlights">Highlights<\/a>/);
  assert.match(html, /href="#gallery">Gallery<\/a>/);
  assert.match(html, /href="#booking">Booking<\/a>/);
  assert.match(html, /<h2>Sound<br\/><em>in motion<\/em><\/h2>/);
  assert.match(html, /<h2>Bring the/);
});

test("includes the 3D scene, reduced motion, and responsive experience", async () => {
  const [page, hero, experience, scene, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/Hero.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/hooks/useSiteExperience.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/DeckScene.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(page, /<Hero soundOn=\{soundOn\}/);
  assert.match(hero, /dynamic\(\(\) => import\("\.\/DeckScene"\)/);
  assert.match(experience, /ScrollTrigger/);
  assert.match(experience, /new Lenis/);
  assert.match(scene, /<Canvas/);
  assert.match(scene, /Turntable/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@media \(max-width: 580px\)/);
});
