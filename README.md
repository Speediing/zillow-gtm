# Zillow x SpaceXAI

Passworded site for [zillow-grokbot.vercel.app](https://zillow-grokbot.vercel.app).

## Run

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Password is `land2expand` unless you set `SITE_PASSWORD`.

## Check

```bash
npm run check:zillow
npm run lint
npm run build
```

## Password

`SITE_PASSWORD` is server-only. Do not put it in `NEXT_PUBLIC_*` variables. Production value is `land2expand`.

## Deploy

Vercel project `zillow-grokbot`. Host: [zillow-grokbot.vercel.app](https://zillow-grokbot.vercel.app). Set `SITE_PASSWORD=land2expand`.
