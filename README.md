# GitHub Portfolio

A modern, dynamic portfolio website that automatically fetches and displays your GitHub projects, profile information, and stats. Built with React, TypeScript, Tailwind CSS, and powered by the GitHub API.

## ✨ Features

- **🔄 Automatic GitHub Integration**: Fetches repositories, profile data, and statistics directly from GitHub API
- **🎨 Modern UI**: Beautiful, responsive design with dark mode support
- **⚡ Fast & Optimized**: Built with Vite for lightning-fast performance
- **🎯 Smart Filtering**: Search and filter projects by technology/topic
- **📱 Fully Responsive**: Works seamlessly on all devices
- **♿ Accessible**: WCAG compliant with semantic HTML
- **🎭 Smooth Animations**: Framer Motion for beautiful transitions
- **📦 Type-Safe**: Full TypeScript support

## 🚀 Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **GitHub API**: Octokit
- **Markdown Parsing**: Marked, Gray Matter
- **Deployment**: GitHub Pages

## 📋 Prerequisites

- Node.js 18+ and npm
- GitHub account
- (Optional) GitHub Personal Access Token for higher API rate limits

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/github-portfolio.git
   cd github-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file**
   ```env
   VITE_GITHUB_USERNAME=your-github-username
   VITE_GITHUB_TOKEN=ghp_your_token_here_optional
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎯 Configuration

### GitHub Personal Access Token (Optional but Recommended)

To avoid GitHub API rate limiting, create a Personal Access Token:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio API"
4. Select scopes: `public_repo` (read-only access)
5. Generate token and copy it
6. Add to your `.env` file as `VITE_GITHUB_TOKEN`

### Customization

Edit these files to customize your portfolio:

- **`src/components/sections/Hero.tsx`**: Update name and introduction
- **`src/components/sections/Skills.tsx`**: Modify skills and proficiency levels
- **`src/components/sections/Contact.tsx`**: Update social links and contact info
- **`src/components/layout/Footer.tsx`**: Customize footer links

### Featured Projects

Add front matter to your repository README to feature projects:

```markdown
---
featured: true
demo: https://your-demo-url.com
---

# Your Project Name
```

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

1. **Configure repository settings**
   - Go to Settings → Pages
   - Source: GitHub Actions

2. **Add repository secrets** (if using private token)
   - Go to Settings → Secrets and variables → Actions
   - Add `VITE_GITHUB_USERNAME`
   - Add `VITE_GITHUB_TOKEN` (optional)

3. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy portfolio"
   git push origin main
   ```

4. **GitHub Actions will automatically deploy**
   - Check Actions tab for deployment status
   - Site will be available at `https://yourusername.github.io/repository-name/`

## 📁 Project Structure

```
github-portfolio/
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer
│   │   ├── sections/      # Hero, About, Skills, Projects, Contact
│   │   └── ui/            # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities, GitHub client, parsers
│   ├── store/             # Zustand state management
│   ├── types/             # TypeScript type definitions
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🎨 Features Breakdown

### Automatic GitHub Integration
- Fetches user profile data
- Lists all public repositories
- Displays repository stats (stars, forks)
- Shows programming language distribution
- Parses README files for descriptions

### Smart Caching
- In-memory caching to reduce API calls
- React Query for efficient data management
- Configurable cache duration

### Responsive Design
- Mobile-first approach
- Breakpoints for all screen sizes
- Touch-friendly interactions

### Dark Mode
- System preference detection
- Manual toggle
- Persisted user preference

## 🔧 Troubleshooting

### API Rate Limiting
If you see rate limit errors:
- Add a GitHub Personal Access Token
- Reduce fetch frequency in queries
- Enable caching in development

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### TypeScript Errors
```bash
# Check TypeScript configuration
npm run lint
npx tsc --noEmit
```

## 📄 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
