// To simulate a network delay
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function onRequestGet() {
  await timeout(1000);
  return new Response(`${Date.now() - (Date.now() % 10000)}`);
}
