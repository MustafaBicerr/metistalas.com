# Media pipeline

Source images live in `source-media/`. Website images live in `public/media/`.

```
npm run media:inspect
npm run media:process
npm run media:process -- --dry-run
npm run media:process -- --id raw-logs
```

Rules:

- Never upscale
- Never process `reference-only` records (the AI brand card)
- Desktop and mobile crops use independent focal points
- Output is WebP
