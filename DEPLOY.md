# Guida al Deploy su Vercel

## Prerequisiti

- Account Vercel
- Database PostgreSQL (consigliato: Vercel Postgres)

## Passaggi per il Deploy

### 1. Crea il Database

Su Vercel Dashboard:
1. Vai al tuo progetto
2. Seleziona "Storage" → "Create Database"
3. Scegli "Postgres"
4. Copia la `DATABASE_URL` generata

### 2. Configura le Variabili d'Ambiente

Nel tuo progetto Vercel, vai su Settings → Environment Variables e aggiungi:

```
DATABASE_URL=postgres://...
```

### 3. Deploy

#### Opzione A: Deploy da GitHub

1. Connetti il repository GitHub a Vercel
2. Vercel farà automaticamente il deploy

#### Opzione B: Deploy da CLI

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy in produzione
vercel --prod
```

### 4. Inizializza il Database

Dopo il primo deploy, esegui le migrations:

```bash
# Dalla tua macchina locale, con DATABASE_URL configurato
npx prisma db push
```

Oppure usa Vercel CLI:

```bash
vercel env pull .env.local
npx prisma db push
```

## Variabili d'Ambiente Necessarie

### `DATABASE_URL` (Obbligatorio)

URL di connessione al database PostgreSQL.

**Esempio per Vercel Postgres:**
```
postgres://username:password@host:5432/database
```

**Esempio per sviluppo locale con SQLite:**
```
file:./dev.db
```
(Nota: per usare SQLite, modifica `prisma/schema.prisma` cambiando `provider = "postgresql"` in `provider = "sqlite"`)

## Sviluppo Locale

### Con PostgreSQL

1. Installa PostgreSQL localmente
2. Crea un database: `createdb pasta`
3. Copia `.env.example` in `.env`
4. Modifica `DATABASE_URL` nel file `.env`
5. Esegui le migrations: `npm run db:push`
6. Avvia il server: `npm run dev`

### Con SQLite (più semplice)

1. Modifica `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```
2. Esegui: `npx prisma generate`
3. Esegui: `npm run db:push`
4. Avvia: `npm run dev`

## Note Importanti

- ⚠️ **SQLite non è supportato su Vercel** (solo per sviluppo locale)
- ✅ Per produzione usa sempre **PostgreSQL** o altro DB cloud
- 🔒 Tutti i dati sono cifrati end-to-end lato client
- 🔑 Le chiavi di cifratura non vengono mai inviate al server
- 🗑️ I paste con "burn after reading" vengono eliminati automaticamente dopo la prima visualizzazione

## Comandi Utili

```bash
# Sviluppo
npm run dev

# Build locale
npm run build

# Prisma Studio (GUI per il database)
npm run db:studio

# Push schema al database
npm run db:push

# Genera Prisma Client
npx prisma generate
```

## Troubleshooting

### Errore: "Can't reach database server"

- Verifica che `DATABASE_URL` sia corretto
- Controlla che il database sia accessibile
- Su Vercel, assicurati che la variabile sia configurata

### Errore di build su Vercel

- Verifica che `postinstall` script sia presente in `package.json`
- Controlla i log di build per errori specifici

### Database non sincronizzato

```bash
# Reset completo del database (⚠️ CANCELLA TUTTI I DATI)
npx prisma db push --force-reset
```

