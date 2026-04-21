# Fix and Deploy Script
# Run this to fix your current deployment issue

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Portfolio Deployment Fix Script" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Get current directory
$CurrentDir = Get-Location
Write-Host "Current directory: $CurrentDir" -ForegroundColor Yellow
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "[ERROR] You're not in the elevator directory!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run:" -ForegroundColor Yellow
    Write-Host 'cd "c:\Users\Mafia\Desktop\about me\elevator"' -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[OK] Found package.json - correct directory" -ForegroundColor Green
Write-Host ""

# Step 1: Check Git status
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 1: Checking Git Status" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

git status
Write-Host ""

# Step 2: Add all files
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 2: Adding All Project Files" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

git add .
Write-Host "Files added to Git" -ForegroundColor Green
Write-Host ""

# Step 3: Check what will be committed
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 3: Files to be Committed" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$FileCount = (git status --short | Measure-Object).Count
Write-Host "Total files to commit: $FileCount" -ForegroundColor Yellow
Write-Host ""

# Show some key files
Write-Host "Key files included:" -ForegroundColor Cyan
$KeyFiles = @("app", "components", "lib", "hooks", "context", "public", "package.json")
foreach ($file in $KeyFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    }
}
Write-Host ""

# Check excluded files
Write-Host "Files EXCLUDED (in .gitignore):" -ForegroundColor Cyan
$ExcludedFiles = @("node_modules", ".next", ".env", ".env.local", "portfolio_backup_raw")
foreach ($file in $ExcludedFiles) {
    if (Test-Path $file) {
        Write-Host "  [EXCLUDED] $file" -ForegroundColor Yellow
    }
}
Write-Host ""

# Step 4: Create backup
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 4: Creating Backup" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$BackupDir = Join-Path $CurrentDir "portfolio_backup_raw"

if (Test-Path $BackupDir) {
    Write-Host "Backup already exists, updating..." -ForegroundColor Yellow
    Remove-Item -Path $BackupDir -Recurse -Force
}

New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

# Copy files
Write-Host "Copying files to backup..." -ForegroundColor Yellow
robocopy . $BackupDir /MIR /XD node_modules .next .git portfolio_backup_raw obfuscated_output /XF .env .env.local .env.production *.log .DS_Store Thumbs.db *.tsbuildinfo /NFL /NDL /NJH /NJS

if ($LASTEXITCODE -le 7) {
    $BackupFileCount = (Get-ChildItem -Path $BackupDir -Recurse -File).Count
    Write-Host "Backup created: $BackupDir" -ForegroundColor Green
    Write-Host "Files backed up: $BackupFileCount" -ForegroundColor Green
} else {
    Write-Host "Warning: Backup had issues (robocopy exit: $LASTEXITCODE)" -ForegroundColor Yellow
}

Write-Host ""

# Step 5: Commit
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 5: Creating Commit" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$CommitMessage = "Deploy full portfolio project [$Timestamp]"

git commit -m $CommitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "Commit created successfully" -ForegroundColor Green
} else {
    Write-Host "No changes to commit or commit failed" -ForegroundColor Yellow
}

Write-Host ""

# Step 6: Push to GitHub
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Step 6: Pushing to GitHub" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Attempting to push to GitHub..." -ForegroundColor Yellow
Write-Host ""

# Try to push
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host "  SUCCESS! Deployment Complete!" -ForegroundColor Green
    Write-Host "=================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your portfolio has been pushed to:" -ForegroundColor Cyan
    Write-Host "https://github.com/Maf0ia/portfolio-" -ForegroundColor White
    Write-Host ""
    Write-Host "Backup location:" -ForegroundColor Cyan
    Write-Host "$BackupDir" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "Push failed. Trying alternative methods..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try without force
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "SUCCESS! (pushed without force flag)" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "=================================================" -ForegroundColor Red
        Write-Host "  Push Failed - Manual Action Required" -ForegroundColor Red
        Write-Host "=================================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "Try these commands manually:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Authenticate with GitHub:" -ForegroundColor Cyan
        Write-Host "   git push -u origin main --force" -ForegroundColor White
        Write-Host ""
        Write-Host "2. Or use GitHub CLI:" -ForegroundColor Cyan
        Write-Host "   gh auth login" -ForegroundColor White
        Write-Host "   git push -u origin main" -ForegroundColor White
        Write-Host ""
        Write-Host "3. Check your repository:" -ForegroundColor Cyan
        Write-Host "   https://github.com/Maf0ia/portfolio-" -ForegroundColor White
        Write-Host ""
    }
}

# Step 7: Summary
Write-Host ""
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Summary" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backup created at:" -ForegroundColor Yellow
Write-Host "$BackupDir" -ForegroundColor White
Write-Host ""
Write-Host "Files in backup:" -ForegroundColor Yellow
if (Test-Path $BackupDir) {
    Get-ChildItem -Path $BackupDir -Recurse -File | Select-Object -First 10 | ForEach-Object {
        Write-Host "  - $($_.Name)" -ForegroundColor Gray
    }
    $TotalFiles = (Get-ChildItem -Path $BackupDir -Recurse -File).Count
    Write-Host "  ... and $($TotalFiles - 10) more files" -ForegroundColor Gray
}
Write-Host ""

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
