# Secure Deployment Script for Next.js Portfolio
# This script creates a backup, obfuscates code, and pushes to GitHub
# Run with: .\deploy.ps1

param(
    [string]$CommitMessage = "Deploy obfuscated portfolio to production",
    [switch]$SkipBackup,
    [switch]$SkipObfuscation,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Status { param([string]$Message) Write-Host "[INFO] $Message" -ForegroundColor Cyan }
function Write-Success { param([string]$Message) Write-Host "[SUCCESS] $Message" -ForegroundColor Green }
function Write-Warning { param([string]$Message) Write-Host "[WARNING] $Message" -ForegroundColor Yellow }
function Write-Error-Custom { param([string]$Message) Write-Host "[ERROR] $Message" -ForegroundColor Red }

# Get script directory
$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ProjectRoot

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Portfolio Secure Deployment Script" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify prerequisites
Write-Status "Checking prerequisites..."

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Status "Node.js version: $nodeVersion"
} catch {
    Write-Error-Custom "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
}

# Check npm
try {
    $npmVersion = npm --version
    Write-Status "npm version: $npmVersion"
} catch {
    Write-Error-Custom "npm is not installed."
    exit 1
}

# Check Git
try {
    $gitVersion = git --version
    Write-Status "Git version: $gitVersion"
} catch {
    Write-Error-Custom "Git is not installed. Please install Git first."
    exit 1
}

Write-Host ""

# Step 2: Install obfuscator if needed
Write-Status "Checking javascript-obfuscator..."
$ObfuscatorInstalled = Test-Path "node_modules/javascript-obfuscator"

if (-not $ObfuscatorInstalled) {
    Write-Status "Installing javascript-obfuscator..."
    npm install --save-dev javascript-obfuscator
    Write-Success "javascript-obfuscator installed"
} else {
    Write-Status "javascript-obfuscator already installed"
}

Write-Host ""

# Step 3: Create backup
if (-not $SkipBackup) {
    Write-Host "=================================================" -ForegroundColor Cyan
    Write-Host "  Step 1: Creating Backup" -ForegroundColor Cyan
    Write-Host "=================================================" -ForegroundColor Cyan
    
    $BackupDir = Join-Path $ProjectRoot "portfolio_backup_raw"
    
    if (Test-Path $BackupDir) {
        Write-Status "Removing old backup..."
        Remove-Item -Path $BackupDir -Recurse -Force
    }
    
    Write-Status "Creating backup directory: $BackupDir"
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
    
    # Get list of files to backup (exclude node_modules, .next, .env, etc.)
    $ExcludePatterns = @(
        "node_modules",
        ".next",
        "out",
        ".env",
        ".env.*",
        "!.env.example",
        "portfolio_backup_raw",
        "obfuscated_output",
        ".git",
        "dist",
        "build",
        "*.log",
        ".DS_Store",
        "Thumbs.db"
    )
    
    Write-Status "Copying source files to backup..."
    
    # Use robocopy for reliable copying with exclusions
    $robocopyArgs = @(
        $ProjectRoot,
        $BackupDir,
        "/MIR",
        "/XD", "node_modules", ".next", "out", "portfolio_backup_raw", "obfuscated_output", ".git", "dist", "build",
        "/XF", ".env", ".env.local", ".env.production", "*.log", ".DS_Store", "Thumbs.db", "*.tsbuildinfo",
        "/NFL",  # No file list
        "/NDL",  # No directory list
        "/NJH",  # No job header
        "/NJS"   # No job summary
    )
    
    & robocopy @robocopyArgs | Out-Null
    
    if ($LASTEXITCODE -le 7) {
        Write-Success "Backup created successfully at: $BackupDir"
        
        # Count backed up files
        $FileCount = (Get-ChildItem -Path $BackupDir -Recurse -File).Count
        Write-Status "Backed up $FileCount files"
    } else {
        Write-Error-Custom "Backup failed with robocopy exit code: $LASTEXITCODE"
        exit 1
    }
    
    Write-Host ""
}

# Step 4: Build the project
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 2: Building Project" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Write-Status "Running production build..."
try {
    npm run build
    Write-Success "Build completed successfully"
} catch {
    Write-Error-Custom "Build failed!"
    exit 1
}

Write-Host ""

# Step 5: Obfuscate code
if (-not $SkipObfuscation) {
    Write-Host "=================================================" -ForegroundColor Cyan
    Write-Host "  Step 3: Obfuscating Code" -ForegroundColor Cyan
    Write-Host "=================================================" -ForegroundColor Cyan
    
    $ObfuscatorScript = @"
const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

// Directories to obfuscate
const TARGET_DIRS = ['app', 'components', 'lib', 'hooks', 'context'];
const OUTPUT_DIR = 'obfuscated_output';

// Obfuscation options
const OBFUSCATOR_OPTIONS = {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
};

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else {
            if ((file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) &&
                !file.endsWith('.d.ts') &&
                !file.includes('node_modules')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    
    return arrayOfFiles;
}

function obfuscateFile(filePath) {
    try {
        const code = fs.readFileSync(filePath, 'utf8');
        
        // Skip files with 'use client' or 'use server' directives initially
        // We'll handle them specially
        const isClientComponent = code.includes('"use client"') || code.includes("'use client'");
        const isServerComponent = code.includes('"use server"') || code.includes("'use server'");
        
        // For Next.js, we need to be careful with obfuscation
        // Skip obfuscation for files with special directives to preserve functionality
        if (isClientComponent || isServerComponent) {
            console.log(\`  [SKIP] \${filePath} (contains directive)\`);
            return false;
        }
        
        const obfuscated = JavaScriptObfuscator.obfuscate(code, OBFUSCATOR_OPTIONS);
        
        // Create output path
        const relativePath = path.relative(process.cwd(), filePath);
        const outputPath = path.join(OUTPUT_DIR, relativePath);
        
        // Create directory if it doesn't exist
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        
        // Write obfuscated code
        fs.writeFileSync(outputPath, obfuscated.getObfuscatedCode(), 'utf8');
        
        console.log(\`  [OK] \${filePath} -> \${outputPath}\`);
        return true;
    } catch (error) {
        console.error(\`  [ERROR] \${filePath}: \${error.message}\`);
        return false;
    }
}

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Starting obfuscation...\\n');

let totalFiles = 0;
let obfuscatedFiles = 0;
let skippedFiles = 0;

TARGET_DIRS.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(dirPath)) {
        console.log(\`[WARNING] Directory not found: \${dir}\`);
        return;
    }
    
    console.log(\`Processing: \${dir}/\`);
    const files = getAllFiles(dirPath);
    
    files.forEach(file => {
        totalFiles++;
        const result = obfuscateFile(file);
        if (result === true) {
            obfuscatedFiles++;
        } else if (result === false) {
            skippedFiles++;
        }
    });
});

console.log('\\n=================================================');
console.log('Obfuscation Summary:');
console.log(\`  Total files scanned: \${totalFiles}\`);
console.log(\`  Obfuscated: \${obfuscatedFiles}\`);
console.log(\`  Skipped: \${skippedFiles}\`);
console.log('=================================================');
"@

    # Write obfuscator script
    $ObfuscatorScriptPath = Join-Path $ProjectRoot "obfuscate.js"
    $ObfuscatorScript | Out-File -FilePath $ObfuscatorScriptPath -Encoding UTF8
    
    Write-Status "Running obfuscation script..."
    
    if ($DryRun) {
        Write-Warning "DRY RUN - Skipping actual obfuscation"
    } else {
        try {
            node $ObfuscatorScriptPath
            
            # Clean up obfuscator script
            Remove-Item $ObfuscatorScriptPath -ErrorAction SilentlyContinue
            
            Write-Success "Obfuscation completed"
        } catch {
            Write-Error-Custom "Obfuscation failed: $_"
            Write-Warning "Continuing with non-obfuscated code..."
        }
    }
    
    Write-Host ""
}

# Step 6: Git operations
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 4: Git Integration" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Status "Initializing Git repository..."
    git init
    Write-Success "Git repository initialized"
}

# Check remote origin
$CurrentOrigin = git remote get-url origin 2>$null
$TargetOrigin = "https://github.com/Maf0ia/portfolio-.git"

if ($CurrentOrigin -ne $TargetOrigin) {
    Write-Status "Setting remote origin..."
    git remote remove origin 2>$null
    git remote add origin $TargetOrigin
    Write-Success "Remote origin set to: $TargetOrigin"
} else {
    Write-Status "Remote origin already configured"
}

Write-Host ""

# Step 7: Prepare commit
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 5: Preparing Commit" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Write-Status "Checking git status..."
git status --short

Write-Host ""

if ($DryRun) {
    Write-Warning "DRY RUN - Skipping git commit and push"
    Write-Status "To execute for real, run: .\deploy.ps1"
    exit 0
}

# Prompt for confirmation
Write-Host ""
$Confirmation = Read-Host "Ready to commit and push. Continue? (y/n)"

if ($Confirmation -ne 'y' -and $Confirmation -ne 'Y') {
    Write-Warning "Deployment cancelled by user"
    exit 0
}

# Add all files (respects .gitignore)
Write-Status "Adding files to git..."
git add .

# Create commit
Write-Status "Creating commit..."
$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$FullCommitMessage = "$CommitMessage [$Timestamp]"
git commit -m $FullCommitMessage

Write-Success "Commit created: $FullCommitMessage"

Write-Host ""

# Step 8: Push to GitHub
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 6: Pushing to GitHub" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

Write-Status "Pushing to remote repository..."

try {
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Successfully pushed to GitHub!"
    } else {
        # Try with master branch
        Write-Status "Trying master branch..."
        git push -u origin master
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Successfully pushed to GitHub (master branch)!"
        } else {
            Write-Error-Custom "Push failed. Please check your Git credentials and repository access."
            exit 1
        }
    }
} catch {
    Write-Error-Custom "Push failed: $_"
    exit 1
}

Write-Host ""

# Step 9: Summary
Write-Host "=================================================" -ForegroundColor Green
Write-Host "  Deployment Complete!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  ✓ Backup created: portfolio_backup_raw/" -ForegroundColor Green
Write-Host "  ✓ Project built successfully" -ForegroundColor Green

if (-not $SkipObfuscation) {
    Write-Host "  ✓ Code obfuscated: obfuscated_output/" -ForegroundColor Green
}

Write-Host "  ✓ Committed to Git" -ForegroundColor Green
Write-Host "  ✓ Pushed to: $TargetOrigin" -ForegroundColor Green
Write-Host ""
Write-Host "Your portfolio is now deployed! 🚀" -ForegroundColor Cyan
Write-Host ""

# Cleanup prompt
$CleanupPrompt = Read-Host "Clean up obfuscated_output directory? (y/n)"
if ($CleanupPrompt -eq 'y' -or $CleanupPrompt -eq 'Y') {
    if (Test-Path "obfuscated_output") {
        Remove-Item -Path "obfuscated_output" -Recurse -Force
        Write-Status "Cleaned up obfuscated_output directory"
    }
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
