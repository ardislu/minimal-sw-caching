# minimal-sw-caching

Demo repo for a minimal service worker to implement the stale-while-revalidate caching pattern, with a user notification if the origin response is different from the cache:
1. On fetch, immediately serve a cached response if there is one. Continue the original fetch in the background.
2. Update the cache with the new response.
3. If the cache changed, inform the user that an updated version of the page is available.

To run the Cloudflare Worker API and static frontend at the same time:
```
npx wrangler pages dev .
```
