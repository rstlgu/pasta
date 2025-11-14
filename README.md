# 🔐 Pasta - Condivisione Testo Sicura

Piattaforma web per condividere testo in modo sicuro con **crittografia end-to-end** e **zero registrazione**.

## ✨ Features

- 🔒 **Crittografia End-to-End**: AES-GCM 256-bit
- 🚫 **Zero Registrazione**: Nessun dato utente salvato
- ⚡ **Veloce**: Cifratura client-side con Web Crypto API
- 🔥 **Burn After Reading**: Eliminazione automatica dopo la prima lettura
- ⏰ **Scadenza Personalizzabile**: 1h, 4h, 1d, 7d
- 🔑 **Password Opzionale**: Secondo livello di protezione
- 🎨 **UI Moderna**: Tema scuro/chiaro, animazioni con Framer Motion
- 📱 **Responsive**: Design mobile-first con share nativo

## 🛠️ Stack Tecnologico

- **Framework**: Next.js 14 (App Router)
- **UI**: React, Tailwind CSS, Shadcn UI
- **Animazioni**: Framer Motion
- **Crittografia**: Web Crypto API
- **Database**: PostgreSQL + Prisma (SQLite per dev locale)
- **TypeScript**: Type-safe
- **Deploy**: Vercel-ready

## 🚀 Quick Start

### Installazione

```bash
# Installa dipendenze
npm install

# Setup database
npm run db:push

# Avvia in sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

### Build per Produzione

```bash
npm run build
npm start
```

## 🌐 Deploy su Vercel

### Prerequisiti
- Account [Vercel](https://vercel.com)
- Database PostgreSQL (consigliato: Vercel Postgres)

### Setup Rapido

1. **Crea Database PostgreSQL**
   - Dashboard Vercel → Storage → Create Database → Postgres
   - Copia il `DATABASE_URL`

2. **Deploy**
   ```bash
   # Installa Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Configura Environment Variables**
   - Settings → Environment Variables
   - Aggiungi: `DATABASE_URL=postgres://...`

4. **Inizializza Database**
   ```bash
   # Dalla tua macchina
   vercel env pull .env.local
   npx prisma db push
   ```

📖 **Guida Completa**: Vedi [DEPLOY.md](./DEPLOY.md)

## 🔐 Architettura di Sicurezza

### Flusso di Cifratura

1. **Creazione**: 
   - Utente scrive testo
   - Generazione chiave AES-256 nel browser
   - Cifratura con AES-GCM
   - Invio solo contenuto cifrato al server

2. **Condivisione**:
   - URL: `https://sito.com/view/{id}#chiave_base64`
   - Il fragment `#chiave` NON viene mai inviato al server
   - Rimane solo nel browser

3. **Lettura**:
   - Scarica contenuto cifrato
   - Estrae chiave dal fragment
   - Decifra localmente nel browser

### Sicurezza

- ✅ Chiave mai trasmessa al server
- ✅ Server vede solo dati cifrati
- ✅ Cifratura: AES-GCM 256-bit
- ✅ IV casuali per ogni paste
- ✅ Nessun tracking, nessun cookie
- ✅ Eliminazione automatica scadenze

## 📁 Struttura Progetto

```
pasta/
├── app/
│   ├── api/paste/          # API Routes
│   ├── view/[id]/          # Pagina visualizzazione
│   ├── layout.tsx          # Layout root
│   ├── page.tsx            # Homepage
│   └── globals.css         # Stili globali
├── components/ui/          # Componenti UI
├── lib/
│   ├── crypto.ts           # Libreria crittografia
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Utility
├── prisma/
│   └── schema.prisma       # Schema database
└── package.json
```

## 🎯 API Endpoints

### POST `/api/paste`

Crea nuovo paste cifrato.

**Body**:
```json
{
  "encryptedContent": "string",
  "iv": "string",
  "hasPassword": boolean,
  "burnAfterReading": boolean,
  "expiresIn": "1h" | "24h" | "7d" | "never"
}
```

**Response**:
```json
{
  "id": "uuid"
}
```

### GET `/api/paste/{id}`

Recupera paste cifrato.

**Response**:
```json
{
  "encryptedContent": "string",
  "iv": "string",
  "hasPassword": boolean,
  "burnAfterReading": boolean
}
```

## 🔧 Configurazione

### Variabili d'Ambiente

Crea `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

### Database

Il progetto usa SQLite per semplicità. Per produzione, considera PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 📦 Deploy

### Vercel

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm run db:push
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔒 Best Practices

1. **URL Fragment**: La chiave nell'URL fragment (#) NON viene mai inviata al server
2. **HTTPS Obbligatorio**: Sempre usare HTTPS in produzione
3. **Limiti**: Max 100KB di testo per paste
4. **Cleanup**: Job automatico per eliminare paste scaduti

## 📄 Licenza

MIT License - Usa liberamente!

## 🤝 Contribuire

Pull requests benvenute! Per modifiche importanti, apri prima una issue.

## 🙏 Credits

Creato con ❤️ usando:
- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Prisma](https://www.prisma.io/)

---

**⚠️ Disclaimer**: Questo è un progetto educativo. Per uso in produzione, considera audit di sicurezza professionali.

