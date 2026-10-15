# Portfolio_personal

## Video hosting

The files in `videos/` are intentionally ignored by Git because they are large. For the deployed Vercel site, host them in a video/CDN service and set `window.PORTFOLIO_VIDEO_BASE_URL` near the top of `script.js` to that hosted folder. The existing local `videos/...` paths remain available for local development.

For different URLs per video, add `data-video-src="https://..."` to that video's `<video>` element; it takes precedence over the shared base URL.
