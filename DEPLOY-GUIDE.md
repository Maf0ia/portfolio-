# Deployment Guide - Secure Portfolio Deployment

## Overview

This guide explains how to use the automated deployment scripts to securely deploy your Next.js portfolio to GitHub with code obfuscation.

## Scripts Available

### Windows (PowerShell)
- **File**: `deploy.ps1`
- **Usage**: `.\deploy.ps1`

### Linux/Mac (Bash)
- **File**: `deploy.sh`
- **Usage**: `chmod +x deploy.sh && ./deploy.sh`

## What the Script Does

### 1. ✅ Prerequisites Check
- Verifies Node.js is installed (18+)
- Verifies npm is installed
- Verifies Git is installed
- Installs `javascript-obfuscator` if not present

### 2. 📦 Creates Backup
- Creates `portfolio_backup_raw/` directory
- Copies all source code **except**:
  - `node_modules/`
  - `.next/`
  - `.env` files (except `.env.example`)
  - `.git/`
  - Build artifacts
  - Log files
- Preserves your original, un-obfuscated code safely

### 3. 🔨 Builds Project
- Runs `npm run build`
- Creates optimized production bundle
- Verifies build succeeds before continuing

### 4. 🔐 Obfuscates Code
- Obfuscates JavaScript/TypeScript files in:
  - `app/`
  - `components/`
  - `lib/`
  - `hooks/`
  - `context/`
- Uses advanced obfuscation techniques:
  - Control flow flattening
  - Dead code injection
  - String array encryption (RC4)
  - Identifier name mangling (hexadecimal)
  - Self-defending code
- **Skips** files with Next.js directives:
  - `"use client"`
  - `"use server"`
  - (To preserve functionality)
- Outputs to `obfuscated_output/` directory

### 5. 🔄 Git Integration
- Initializes Git repository if not present
- Sets remote origin to: `https://github.com/Maf0ia/portfolio-.git`
- Adds all files (respects `.gitignore`)
- Creates commit with timestamp
- Pushes to GitHub (tries `main`, then `master` branch)

### 6. 🧹 Cleanup
- Optionally removes `obfuscated_output/` directory
- Removes temporary obfuscator script

## Quick Start

### Windows

```powershell
# Navigate to project directory
cd "c:\Users\Mafia\Desktop\about me\elevator"

# Run deployment script
.\deploy.ps1
```

### Linux/Mac

```bash
# Navigate to project directory
cd /path/to/elevator

# Make script executable
chmod +x deploy.sh

# Run deployment script
./deploy.sh
```

## Advanced Usage

### PowerShell Parameters

```powershell
# Custom commit message
.\deploy.ps1 -CommitMessage "My custom commit message"

# Skip backup (if you already have one)
.\deploy.ps1 -SkipBackup

# Skip obfuscation (deploy original code)
.\deploy.ps1 -SkipObfuscation

# Dry run (see what would happen without executing)
.\deploy.ps1 -DryRun

# Combine multiple options
.\deploy.ps1 -SkipBackup -CommitMessage "Quick deploy"
```

### Bash Parameters

Edit the script variables at the top:
```bash
COMMIT_MESSAGE="Your custom message"
SKIP_BACKUP=false
SKIP_OBFUSCATION=false
```

## Obfuscation Details

### What Gets Obfuscated
- All `.js`, `.jsx`, `.ts`, `.tsx` files in target directories
- Variable names → Hexadecimal identifiers
- String literals → Encrypted string array with RC4
- Control flow → Flattened and complexified
- Dead code → Injected to confuse reverse engineering

### What Gets Skipped
- Files with `"use client"` directive
- Files with `"use server"` directive
- Type definition files (`.d.ts`)
- `node_modules/`
- Configuration files

### Obfuscation Options

```javascript
{
    compact: true,                    // Remove whitespace
    controlFlowFlattening: true,      // Flatten control flow
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,          // Add dead code
    deadCodeInjectionThreshold: 0.4,
    identifierNamesGenerator: 'hexadecimal',
    selfDefending: true,              // Prevent formatting/debugging
    stringArray: true,                // Move strings to array
    stringArrayEncoding: ['rc4'],     // Encrypt string array
    stringArrayThreshold: 0.75,       // Percentage of strings to obfuscate
    transformObjectKeys: true,        // Obfuscate object keys
    // ... and more
}
```

## Security Features

### .gitignore Protection
The following are **NEVER** committed:
- ✅ `node_modules/`
- ✅ `.next/`
- ✅ `.env`, `.env.local`, `.env.production`
- ✅ `*.log` files
- ✅ Build artifacts
- ✅ `.DS_Store`, `Thumbs.db`

### Backup Safety
- Backup contains **original** source code
- Stored locally in `portfolio_backup_raw/`
- Not committed to Git
- Not obfuscated
- Safe from accidental deletion

### Repository Security
- Only obfuscated code is pushed
- Original source stays local
- Sensitive files excluded via `.gitignore`
- HTTPS authentication required for push

## Troubleshooting

### Script Fails at Obfuscation

**Problem**: Obfuscation fails with errors

**Solution**:
```bash
# The script will continue without obfuscation
# Or manually skip it:
.\deploy.ps1 -SkipObfuscation
```

### Git Push Fails

**Problem**: Authentication error or push rejected

**Solutions**:
1. Check Git credentials:
   ```bash
   git config --global credential.helper
   ```

2. Try manual authentication:
   ```bash
   git push -u origin main
   ```

3. Use SSH instead of HTTPS:
   ```bash
   git remote set-url origin git@github.com:Maf0ia/portfolio-.git
   ```

### Build Fails

**Problem**: `npm run build` fails

**Solutions**:
1. Check for TypeScript errors:
   ```bash
   npm run type-check
   ```

2. Clear cache and rebuild:
   ```bash
   npm run clean
   npm run build
   ```

3. Check dependencies:
   ```bash
   npm install
   ```

### Backup Takes Too Long

**Problem**: Backup process is slow

**Solution**: 
- Skip backup if you already have one:
  ```powershell
  .\deploy.ps1 -SkipBackup
  ```

## Manual Deployment (Without Script)

If you prefer manual control:

### Step 1: Backup
```bash
# Create backup
mkdir portfolio_backup_raw
rsync -a --exclude='node_modules' --exclude='.next' --exclude='.env' . portfolio_backup_raw/
```

### Step 2: Build
```bash
npm run build
```

### Step 3: Obfuscate (Optional)
```bash
# Install obfuscator
npm install --save-dev javascript-obfuscator

# Run obfuscation
node obfuscate.js
```

### Step 4: Git
```bash
git init
git remote add origin https://github.com/Maf0ia/portfolio-.git
git add .
git commit -m "Deploy portfolio"
git push -u origin main
```

## Post-Deployment Checklist

After successful deployment:

- [ ] Verify repository on GitHub
- [ ] Check that sensitive files are not present
- [ ] Test deployed application
- [ ] Verify backup exists in `portfolio_backup_raw/`
- [ ] Consider deleting `obfuscated_output/` if not needed
- [ ] Update deployment documentation

## Recovery

### Restore from Backup

If you need to restore original code:

```bash
# Delete current project (BE CAREFUL!)
rm -rf app components lib hooks context

# Copy from backup
cp -r portfolio_backup_raw/app .
cp -r portfolio_backup_raw/components .
cp -r portfolio_backup_raw/lib .
cp -r portfolio_backup_raw/hooks .
cp -r portfolio_backup_raw/context .
```

### Revert Git Commit

```bash
# See commit history
git log --oneline

# Revert to specific commit
git revert <commit-hash>

# Or reset (dangerous - rewrites history)
git reset --hard <commit-hash>
git push -f origin main
```

## Best Practices

### Before Deployment
1. ✅ Test locally with `npm run dev`
2. ✅ Run `npm run build` successfully
3. ✅ Commit important changes
4. ✅ Create backup
5. ✅ Review `.gitignore`

### After Deployment
1. ✅ Verify on GitHub
2. ✅ Test deployed version
3. ✅ Monitor for errors
4. ✅ Keep backup safe
5. ✅ Document changes

### Security
1. ✅ Never commit `.env` files
2. ✅ Use strong passwords
3. ✅ Enable 2FA on GitHub
4. ✅ Review obfuscated code
5. ✅ Keep dependencies updated

## Support

If you encounter issues:

1. Check the error message
2. Review this documentation
3. Check Git credentials
4. Verify Node.js version
5. Try running with `-DryRun` flag first

## Automation

### Schedule Regular Deployments

**Windows Task Scheduler**:
```powershell
# Create scheduled task
schtasks /create /tn "Portfolio Deploy" /tr "powershell -File C:\path\to\deploy.ps1" /sc daily /st 02:00
```

**Cron Job (Linux/Mac)**:
```bash
# Edit crontab
crontab -e

# Add daily deployment at 2 AM
0 2 * * * /path/to/deploy.sh
```

---

**Remember**: Always keep your `portfolio_backup_raw/` directory safe. It contains your original, un-obfuscated source code!
