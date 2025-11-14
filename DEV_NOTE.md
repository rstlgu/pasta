# ⚠️ Nota per Deploy su Vercel

## Database Configuration

### Sviluppo Locale (Attuale)
- **Provider**: SQLite
- **DATABASE_URL**: `file:./dev.db`
- Configurato in `prisma/schema.prisma` come `provider = "sqlite"`

### Prima del Deploy su Vercel

**IMPORTANTE**: Prima di fare il deploy su Vercel, devi cambiare il database provider:

1. **Modifica `prisma/schema.prisma`**:
   ```prisma
   datasource db {
     provider = "postgresql"  // Cambia da "sqlite" a "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Rigenera Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Configura DATABASE_URL su Vercel**:
   - Vai su Vercel Dashboard → Settings → Environment Variables
   - Aggiungi: `DATABASE_URL=postgres://...` (URL del tuo database PostgreSQL)

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Ready for production with PostgreSQL"
   git push
   # oppure
   vercel --prod
   ```

## Comandi Utili

```bash
# Per sviluppo locale (SQLite)
npm run dev

# Per testare build locale
npm run build

# Per switchare tra SQLite e PostgreSQL
# Modifica prisma/schema.prisma → provider
# Poi esegui:
npx prisma generate
npx prisma db push
```

## File Importanti
- `prisma/schema.prisma` - Configurazione database
- `.env` - Variabili d'ambiente locali (non committare!)
- `env.example` - Template per variabili d'ambiente

