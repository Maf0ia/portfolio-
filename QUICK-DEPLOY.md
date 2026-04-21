# 🚀 Quick Deployment Reference

## One-Command Deployment

### Windows
```powershell
.\deploy.ps1
```

### Linux/Mac
```bash
chmod +x deploy.sh && ./deploy.sh
```

## What Happens

1. ✅ Checks prerequisites (Node, npm, Git)
2. 📦 Creates backup in `portfolio_backup_raw/`
3. 🔨 Builds production bundle
4. 🔐 Obfuscates code to `obfuscated_output/`
5. 🔄 Commits and pushes to GitHub
6. 🧹 Optional cleanup

## Advanced Options (PowerShell)

```powershell
# Custom commit message
.\deploy.ps1 -CommitMessage "Update portfolio"

# Skip backup
.\deploy.ps1 -SkipBackup

# Skip obfuscation
.\deploy.ps1 -SkipObfuscation

# Test run (no changes)
.\deploy.ps1 -DryRun
```

## Manual Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Security audit
npm run security:check

# Type check
npm run type-check

# Clean build
npm run clean

# Run production
npm start
```

## Git Commands

```bash
# Initialize repo
git init

# Add remote
git remote add origin https://github.com/Maf0ia/portfolio-.git

# Check status
git status

# Add all (respects .gitignore)
git add .

# Commit
git commit -m "Your message"

# Push
git push -u origin main
```

## Recovery

```bash
# Restore from backup
cp -r portfolio_backup_raw/* .

# Revert last commit
git revert HEAD

# Force reset (dangerous!)
git reset --hard <commit>
git push -f origin main
```

## Docker Deploy

```bash
# Build and run
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | `npm run clean && npm run build` |
| Push fails | Check Git credentials |
| Obfuscation fails | Use `-SkipObfuscation` |
| Backup too slow | Use `-SkipBackup` |
| Port in use | Change PORT in .env.local |

## Important Files

- `deploy.ps1` - Windows deployment script
- `deploy.sh` - Linux/Mac deployment script
- `portfolio_backup_raw/` - Your original code (LOCAL ONLY)
- `obfuscated_output/` - Obfuscated code (temporary)
- `.gitignore` - Files to exclude from Git

## Security Checklist

- ✅ Never commit `.env` files
- ✅ Keep `portfolio_backup_raw/` safe
- ✅ Use HTTPS for deployment
- ✅ Enable 2FA on GitHub
- ✅ Review obfuscated code
- ✅ Test before deploying

---

**Need help?** See `DEPLOY-GUIDE.md` for full documentation.
