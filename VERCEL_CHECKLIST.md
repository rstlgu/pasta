# ✅ Checklist Pre-Deploy Vercel

## File di Configurazione

- [x] `package.json` - Script `postinstall: prisma generate` aggiunto
- [x] `prisma/schema.prisma` - Configurato per PostgreSQL
- [x] `vercel.json` - Configurazione Vercel creata
- [x] `.eslintrc.json` - ESLint configurato
- [x] `.gitignore` - File corretto
- [x] `next.config.mjs` - Configurazione Next.js

## Database

- [x] Schema Prisma aggiornato per PostgreSQL
- [ ] Database PostgreSQL creato su Vercel
- [ ] `DATABASE_URL` configurato nelle variabili d'ambiente Vercel
- [ ] Migrations eseguite (`npx prisma db push`)

## Codice

- [x] Nessun errore ESLint
- [x] Nessun errore TypeScript
- [x] Tutti gli import corretti
- [x] Componenti ottimizzati

## Variabili d'Ambiente

Su Vercel Dashboard → Settings → Environment Variables, configura:

```
DATABASE_URL=postgres://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb
```

## Build Locale (Test)

```bash
# Test build
npm run build

# Se fallisce, verifica errori e risolvi
```

## Deploy

### Metodo 1: GitHub (Consigliato)

1. Push su GitHub
2. Importa repo su Vercel
3. Configura variabili d'ambiente
4. Deploy automatico

### Metodo 2: CLI

```bash
# Installa CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## Post-Deploy

1. Verifica che l'app funzioni: `https://tuo-dominio.vercel.app`
2. Testa creazione paste
3. Testa visualizzazione paste
4. Testa burn after reading
5. Testa password protection
6. Testa theme toggle
7. Testa responsive mobile

## Troubleshooting

### Errore Build

```bash
# Verifica build locale
npm run build

# Controlla logs Vercel
vercel logs
```

### Errore Database

- Verifica `DATABASE_URL` nelle env variables
- Controlla che il database PostgreSQL sia attivo
- Esegui `npx prisma db push` dopo il primo deploy

### Errore 500

- Controlla logs: `vercel logs --follow`
- Verifica che tutte le dipendenze siano in `package.json`
- Controlla che `postinstall` script esegua `prisma generate`

## Note Importanti

⚠️ **SQLite NON funziona su Vercel** - Usa solo PostgreSQL in produzione

✅ **Prisma** viene configurato automaticamente tramite lo script `postinstall`

🔒 **Sicurezza** - Tutte le chiavi di cifratura rimangono client-side, mai sul server

🚀 **Edge Runtime** - L'app è ottimizzata per Vercel Edge Network

