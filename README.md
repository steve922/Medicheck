# Medicheck

This project uses Cloudflare Pages Functions to proxy requests and inject hashed credentials into front-end pages.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the local server (if needed):

```bash
npm start
```

## Deployment to Cloudflare Pages

1. Create a new Cloudflare Pages project and connect this repository.
2. In the **Environment variables** section of your Pages project, add the following:
   - `PASSWORD` – plain text password
   - `ADMINPASSWORD` – plain text admin password
   - `CACHE_TTL` – cache time in seconds
   - `USER_AGENTS_JSON` – JSON array of user agents
   - `HEADERS_JSON` – JSON object of extra headers
   - `PROXY_TARGET` – base URL to proxy
3. Set the **Build command** to `npm install` and the **Build output directory** to the project root.
4. The functions in `/functions` will automatically handle requests.

When visiting the deployed site, the hashed values of `PASSWORD` and `ADMINPASSWORD` are injected into HTML responses in place of `__PASSWORD__` and `__ADMINPASSWORD__`.
