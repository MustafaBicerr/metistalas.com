# MET-İŞ TALAŞ

Industrial marketing website for MET-İŞ TALAŞ, a wood-shavings manufacturer in Yurtbaşı, Elazığ.

Canonical site: [https://metistalas.com](https://metistalas.com). Turkish is the default locale (`/`). English lives at `/en` and is switched from the header `TR | EN` control. There is no backend: contact is telephone, WhatsApp, and Instagram only.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- next-intl (`localeDetection: false`, `localePrefix: as-needed`)
- GSAP + ScrollTrigger (`@gsap/react`)
- Three.js (desktop WebGL shatter only)
- Sharp desktop/mobile WebP pipeline
- Docker standalone + nginx reverse proxy

## Develop

```bash
npm install
npm run dev
```

- Turkish: http://localhost:3000
- English: http://localhost:3000/en
- Service areas: http://localhost:3000/hizmet-bolgeleri · http://localhost:3000/en/service-areas

## Media

Source photographs live in `source-media/`. Website WebP files are generated into `public/media/` and described in `config/media.ts`.

```bash
npm run media:inspect
npm run media:process
npm run media:process -- --dry-run
npm run media:process -- --id raw-logs
npm run media:logos
```

Do not publish the AI business card. It is brand and contact reference only (`processing_status: "reference-only"`). Licensed mill and livestock photographs are captioned as reference imagery, never as the MET-İŞ facility.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run type-check`
- `npm run media:inspect`
- `npm run media:process`
- `npm run media:logos`

## Brand facts

Taken from the company card. Do not invent email, hours, certifications, capacity, or wood species.

- Name: MET-İŞ TALAŞ
- Address: Elazığ Merkez, Yurtbaşı Beldesi
- Instagram: [instagram.com/metis_talas](https://www.instagram.com/metis_talas/)
- Phones:
  - Sinan Sadık Biçer — `+905061690453`
  - H. Hüseyin Biçer — `+905323216743`
  - Metin Yıldırım — `+905327791937`
- 81 ile teslimat, +20 yıl tecrübe, deneyimli kadro
