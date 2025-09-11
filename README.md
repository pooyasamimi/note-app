# 📒 Note App  

A modern and minimal **note-taking web application** built with **Next.js, TypeScript, TailwindCSS, and Tiptap Editor**.  
It provides a clean interface for writing, organizing, and managing notes with support for **rich text editing, authentication, theming, and responsive design**.  

---

## 🔗 Online Demo  
👉 [See Live Demo](https://poooyanoteapp12e32213.dpdns.org/)  

---

## ✨ Features  
- 📝 **Rich Text Editing** (bold, italic, headings, lists, tables, code blocks, highlight, RTL/LTR support)  
- 🔐 **Authentication** (Google login + session management)  
- 🎨 **Dark/Light Mode Toggle**  
- 📱 **Responsive UI** with TailwindCSS  
- ⚡ **Fast & Scalable** — deployed on Vercel  
- 🌍 **Multi-language typing support** (English & Persian mixed writing)  
- 🗄️ **Auto-save notes** in real time  

---

## 🛠 Tech Stack  
- **Framework**: [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/)  
- **Language**: TypeScript  
- **Styling**: TailwindCSS + shadcn/ui  
- **Editor**: Tiptap (ProseMirror) + Lowlight (syntax highlighting)  
- **Auth**: Better Auth (with Google OAuth)  
- **Deployment**: Vercel  
- **Icons**: Lucide React  
- **DB**: Neon
- **ORM**: Drizzle

---

## 🚀 Getting Started  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/yourusername/note-app.git
cd note-app
```

### 2️⃣ Install dependencies  
```bash
pnpm install
```

### 3️⃣ Setup environment variables  
Create a `.env.local` file in the root:  
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
BETTER_AUTH_SECRET=your_betterauth_secret
DATABASE_URL = your_DB_url
RESEND_API_KEY = your_resend_API_key
```

*(When deploying on Vercel, update these with your production domain.)*  

### 4️⃣ Run the development server  
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.  

---

## 📦 Deployment  
Easily deploy on [Vercel](https://vercel.com/):  
- Push your repo to GitHub  
- Import it into Vercel  
- Add your `.env` variables in **Project Settings → Environment Variables**  
- Done 🎉  

---

## 🤝 Contributing  
Contributions, issues, and feature requests are welcome!  
Feel free to open an [issue](https://github.com/pooyasamimi/note-app/issues) or submit a PR.  

---

## 📜 License  
This project is licensed under the **MIT License**.  




