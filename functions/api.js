export function onRequestGet() {
  return new Response(`This response changes every 10 seconds. ${Date.now() - (Date.now() % 10000)}`);
}
