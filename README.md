# 🍝 Pastaa - Secure Text Sharing

Web platform to securely share text with **end-to-end encryption** and **zero registration**.

## ✨ Features

- 🔒 **End-to-End Encryption**: AES-GCM 256-bit
- 🚫 **Zero Registration**: No user data saved
- ⚡ **Fast**: Client-side encryption with Web Crypto API
- 🔥 **Burn After Reading**: Automatic deletion after first read
- ⏰ **Customizable Expiry**: 1h, 4h, 1d, 7d
- 🔑 **Optional Password**: Second level of protection
- 🎨 **Modern UI**: Dark/light theme, animations with Framer Motion
- 📱 **Responsive**: Mobile-first design with native share

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React, Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion
- **Encryption**: Web Crypto API
- **Database**: PostgreSQL + Prisma (SQLite for local dev)
- **TypeScript**: Type-safe
- **Deploy**: Vercel-ready

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Setup database
npm run db:push

# Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)


## 🔐 Security Architecture

### Encryption Flow

1. **Creation**: 
   - User writes text
   - AES-256 key generation in browser
   - Encryption with AES-GCM
   - Send only encrypted content to server

2. **Sharing**:
   - URL: `https://site.com/view/{id}#base64_key`
   - The fragment `#key` is NEVER sent to the server
   - Stays only in the browser

3. **Reading**:
   - Download encrypted content
   - Extract key from fragment
   - Decrypt locally in browser

### Security

- ✅ Key never transmitted to server
- ✅ Server only sees encrypted data
- ✅ Encryption: AES-GCM 256-bit
- ✅ Random IVs for each paste
- ✅ No tracking, no cookies
- ✅ Automatic expiry deletion


## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

## License

MIT License - Use freely!

## Contributing

Pull requests welcome! For major changes, please open an issue first.