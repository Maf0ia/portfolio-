# 🚀 Decomplied Reality - Cybersecurity Portfolio

An interactive cybersecurity-themed portfolio featuring a HUD (Heads-Up Display) interface with real-time threat visualization, animated transitions, and immersive audio experience.

## ✨ Features

### Interactive HUD Components
- **Identity Core** - Personal information with hacker-themed design
- **Operations Node** - Project showcase with modal details
- **Security Labs** - Security-focused project demonstrations
- **Networking Hub** - Real-time threat map with live packet sniffing
- **C2 Dashboard** - Command & Control dashboard with live event stream
- **The Forge** - Full-stack project showcase
- **Kernel Mods** - Advanced technical projects

### Advanced Animations
- **GSAP Timeline Animations** - Professional-grade entrance/exit animations
- **Framer Motion** - Smooth component transitions
- **Canvas-based Effects** - Matrix rain, threat maps, particle systems
- **Screen Shake Effects** - Immersive glitch animations
- **Progressive Loading** - Cinematic boot sequence

### Real-time Features
- **Live Threat Map** - Interactive cybersecurity threat visualization
- **Packet Sniffer** - Real-time network traffic simulation
- **Node Orchestration** - Active node management dashboard
- **Event Stream** - Live system logs with auto-updates
- **System Monitoring** - CPU, memory, network gauges

### Audio Experience
- **Background Music** - Atmospheric cyberpunk soundtrack
- **Smart Playback** - Plays once on first interaction, no replays
- **Mute Control** - Easy toggle with animations

## 🛡️ Security Features

### Production Ready
- ✅ **HTTP Security Headers** - CSP, X-Frame-Options, XSS Protection
- ✅ **Rate Limiting** - 100 requests/minute per IP
- ✅ **User Agent Filtering** - Blocks common attack tools
- ✅ **Source Map Protection** - Disabled in production
- ✅ **Environment Variables** - Secure configuration
- ✅ **Docker Support** - Containerized deployment
- ✅ **HTTPS Ready** - SSL/TLS support

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd elevator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

### Docker Deployment

```bash
# Build and run with Docker
docker-compose up -d

# Or manually
docker build -t elevator-portfolio .
docker run -p 3000:3000 elevator-portfolio
```

## 📁 Project Structure

```
elevator/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── globals.css        # Global styles & animations
├── components/
│   └── HUD/               # All HUD components
│       ├── MatrixIntro.tsx           # Boot sequence
│       ├── HUDLayout.tsx             # Main layout
│       ├── C2Dashboard.tsx           # C2 dashboard
│       ├── NetworkingHub.tsx         # Network tools
│       ├── GlobalPresenceMap.tsx     # Node orchestration
│       ├── InteractiveThreatMap.tsx  # Threat visualization
│       ├── AudioPlayer.tsx           # Music player
│       └── ...                       # Other components
├── context/               # React context
│   └── SystemContext.tsx  # Global state
├── hooks/                 # Custom hooks
│   └── useHUDStore.ts    # Zustand store
├── lib/                   # Utilities
│   └── gsapAnimations.ts # GSAP helpers
├── public/               # Static assets
│   └── war.mp3          # Background music
├── middleware.ts         # Security middleware
├── next.config.ts        # Next.js configuration
├── Dockerfile            # Docker config
└── docker-compose.yml    # Docker Compose
```

## 🎨 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: 
  - GSAP 3.15.0
  - Framer Motion 12.34.3
- **Icons**: Lucide React
- **State Management**: Zustand (via context)
- **Audio**: HTML5 Audio API
- **Graphics**: Canvas API

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking
npm run security:check   # Run npm audit
npm run security:fix     # Fix security vulnerabilities
npm run clean            # Remove build artifacts
npm run build:production # Production build with NODE_ENV
npm run analyze          # Bundle analysis
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically

### VPS/Cloud

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔐 Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update required variables:
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`

## 📊 Performance

- **Lighthouse Score**: 95+ Performance
- **Bundle Size**: Optimized with code splitting
- **Images**: AVIF/WebP auto-conversion
- **Caching**: Static asset optimization
- **CDN Ready**: Vercel global CDN

## 🎯 Key Features Explained

### Matrix Boot Sequence
- Animated matrix rain background
- Glitch text effects
- Screen shake on loading
- Progress bar with glow pulse
- Smooth transition to HUD

### Interactive Threat Map
- Canvas-based rendering
- Real-time attack visualization
- Severity color coding
- Live statistics
- User location detection

### Node Orchestration
- Active node management
- Real-time load monitoring
- Status indicators
- Bandwidth tracking
- Region-based organization

### Audio System
- Autoplay after first interaction
- No replay on subsequent clicks
- Loop enabled
- Volume control
- Mute toggle with animation

## 🔒 Security Headers

Configured in `next.config.ts`:
- Content-Security-Policy
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly controls
- Adaptive layouts
- Optimized for all devices

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Your Name**
- Portfolio: [Your Website]
- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- GSAP for advanced animations
- Framer Motion for component animations
- Lucide for beautiful icons
- Next.js team for the amazing framework
- Cyberpunk aesthetic inspiration

---

**Built with ❤️ and lots of ☕**

*Click anywhere to start the experience*

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
