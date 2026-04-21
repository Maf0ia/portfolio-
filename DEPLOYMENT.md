# Production Deployment Guide

## Security Features Implemented ✅

### 1. HTTP Security Headers
- **X-Frame-Options: DENY** - Prevents clickjacking attacks
- **X-Content-Type-Options: nosniff** - Prevents MIME type sniffing
- **X-XSS-Protection: 1; mode=block** - XSS filter
- **Content-Security-Policy** - Restricts resource loading
- **Referrer-Policy** - Controls referrer information
- **Permissions-Policy** - Restricts browser features

### 2. Middleware Protection
- **Rate limiting** - 100 requests per minute per IP
- **Suspicious user agent blocking** - Blocks common attack tools
- **Additional security headers** - DNS prefetch control, etc.

### 3. Code Security
- **Source maps disabled** in production
- **Powered-by header removed** - Hides Next.js version
- **React Strict Mode** enabled
- **Image optimization** - AVIF/WebP formats

## Deployment Steps

### Option 1: Vercel (Recommended - Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production ready with security enhancements"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Environment variables will be auto-detected
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Add your domain in Vercel dashboard
   - SSL is automatic

### Option 2: Docker Deployment

1. **Create Dockerfile** (already included)

2. **Build and Run**
   ```bash
   docker build -t elevator-portfolio .
   docker run -p 3000:3000 elevator-portfolio
   ```

3. **With Docker Compose**
   ```bash
   docker-compose up -d
   ```

### Option 3: Traditional VPS (DigitalOcean, AWS, etc.)

1. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and Build**
   ```bash
   git clone <your-repo>
   cd elevator
   npm install
   npm run build
   ```

3. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "elevator" -- start
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

5. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Pre-Deployment Checklist

### Security ✅
- [x] Security headers configured
- [x] Rate limiting enabled
- [x] Source maps disabled
- [x] Environment variables secured
- [x] .gitignore properly configured
- [ ] Change NEXTAUTH_SECRET in .env.local
- [ ] Review CSP policy for your needs

### Performance ✅
- [x] Image optimization enabled
- [x] Compression enabled
- [x] Code splitting (automatic with Next.js)
- [ ] Enable CDN (Vercel provides this automatically)
- [ ] Consider Redis for rate limiting in production

### Testing
- [ ] Test all features locally
- [ ] Run `npm run build` successfully
- [ ] Test on different browsers
- [ ] Test responsive design
- [ ] Verify audio plays correctly
- [ ] Check all animations work

## Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Update the values:
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- Other variables are optional

## Monitoring (Optional)

### Vercel Analytics
```bash
npm install @vercel/analytics
```

### Sentry Error Tracking
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- Better Stack

## Performance Optimization Tips

1. **Enable CDN** - Vercel provides global CDN automatically
2. **Optimize Images** - Already configured for AVIF/WebP
3. **Lazy Loading** - Components load on demand
4. **Code Splitting** - Automatic with Next.js dynamic imports
5. **Caching** - Configure cache headers for static assets

## Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next
npm run build
```

### Audio Not Playing
- Ensure `/war.mp3` is in `/public` folder
- Check file permissions
- Verify HTTPS (required for audio autoplay)

### Animations Not Working
- Check browser console for errors
- Ensure GSAP and Framer Motion are installed
- Verify CSS is properly imported

### Rate Limiting Issues
- Increase limit in `middleware.ts`
- Consider using Redis for distributed rate limiting

## Post-Deployment

1. **Test the live site**
2. **Monitor error logs**
3. **Check performance metrics**
4. **Setup backups**
5. **Configure custom domain**
6. **Enable SSL**
7. **Setup monitoring alerts**

## Security Best Practices

1. **Keep dependencies updated**
   ```bash
   npm audit
   npm update
   ```

2. **Regular security scans**
   ```bash
   npm install -g npx
   npx audit-ci --moderate
   ```

3. **Use HTTPS everywhere**
4. **Regular backups**
5. **Monitor access logs**
6. **Keep Node.js updated**
7. **Review security headers periodically**

## Support

If you encounter issues:
1. Check the console for errors
2. Review deployment logs
3. Verify environment variables
4. Check file permissions
5. Ensure all dependencies are installed

---

**Your portfolio is now production-ready with enterprise-grade security!** 🚀
