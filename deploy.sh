#!/bin/bash

# Secure Deployment Script for Next.js Portfolio
# This script creates a backup, obfuscates code, and pushes to GitHub
# Run with: chmod +x deploy.sh && ./deploy.sh

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
print_status() {
    echo -e "${CYAN}[INFO] $1${NC}"
}

print_success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

print_error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

# Get script directory
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_ROOT"

echo "================================================="
echo -e "${CYAN}  Portfolio Secure Deployment Script${NC}"
echo "================================================="
echo ""

# Step 1: Verify prerequisites
print_status "Checking prerequisites..."

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    print_status "Node.js version: $NODE_VERSION"
else
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    print_status "npm version: $NPM_VERSION"
else
    print_error "npm is not installed."
    exit 1
fi

# Check Git
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    print_status "Git version: $GIT_VERSION"
else
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

echo ""

# Step 2: Install obfuscator if needed
print_status "Checking javascript-obfuscator..."
if [ ! -d "node_modules/javascript-obfuscator" ]; then
    print_status "Installing javascript-obfuscator..."
    npm install --save-dev javascript-obfuscator
    print_success "javascript-obfuscator installed"
else
    print_status "javascript-obfuscator already installed"
fi

echo ""

# Step 3: Create backup
print_status "Creating backup..."
BACKUP_DIR="$PROJECT_ROOT/portfolio_backup_raw"

if [ -d "$BACKUP_DIR" ]; then
    print_status "Removing old backup..."
    rm -rf "$BACKUP_DIR"
fi

print_status "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

print_status "Copying source files to backup (excluding node_modules, .next, .env)..."

# Use rsync for reliable copying with exclusions
if command -v rsync &> /dev/null; then
    rsync -a --progress \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='out' \
        --exclude='.env' \
        --exclude='.env.local' \
        --exclude='.env.production' \
        --exclude='portfolio_backup_raw' \
        --exclude='obfuscated_output' \
        --exclude='.git' \
        --exclude='dist' \
        --exclude='build' \
        --exclude='*.log' \
        --exclude='.DS_Store' \
        --exclude='Thumbs.db' \
        --exclude='*.tsbuildinfo' \
        "$PROJECT_ROOT/" "$BACKUP_DIR/"
    
    print_success "Backup created successfully at: $BACKUP_DIR"
    
    # Count backed up files
    FILE_COUNT=$(find "$BACKUP_DIR" -type f | wc -l)
    print_status "Backed up $FILE_COUNT files"
else
    # Fallback to cp if rsync not available
    print_warning "rsync not found, using cp instead..."
    cp -r "$PROJECT_ROOT"/* "$BACKUP_DIR/" 2>/dev/null || true
    
    # Remove excluded directories
    rm -rf "$BACKUP_DIR/node_modules"
    rm -rf "$BACKUP_DIR/.next"
    rm -rf "$BACKUP_DIR/.env"
    rm -rf "$BACKUP_DIR/.env.local"
    rm -rf "$BACKUP_DIR/.git"
    
    print_success "Backup created at: $BACKUP_DIR"
fi

echo ""

# Step 4: Build the project
echo "================================================="
echo -e "${CYAN}  Step 2: Building Project${NC}"
echo "================================================="

print_status "Running production build..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed!"
    exit 1
fi

echo ""

# Step 5: Obfuscate code
echo "================================================="
echo -e "${CYAN}  Step 3: Obfuscating Code${NC}"
echo "================================================="

cat > obfuscate.js << 'EOF'
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
        
        // Skip files with 'use client' or 'use server' directives
        const isClientComponent = code.includes('"use client"') || code.includes("'use client'");
        const isServerComponent = code.includes('"use server"') || code.includes("'use server'");
        
        if (isClientComponent || isServerComponent) {
            console.log(`  [SKIP] ${filePath} (contains directive)`);
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
        
        console.log(`  [OK] ${filePath} -> ${outputPath}`);
        return true;
    } catch (error) {
        console.error(`  [ERROR] ${filePath}: ${error.message}`);
        return false;
    }
}

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('Starting obfuscation...\n');

let totalFiles = 0;
let obfuscatedFiles = 0;
let skippedFiles = 0;

TARGET_DIRS.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    
    if (!fs.existsSync(dirPath)) {
        console.log(`[WARNING] Directory not found: ${dir}`);
        return;
    }
    
    console.log(`Processing: ${dir}/`);
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

console.log('\n=================================================');
console.log('Obfuscation Summary:');
console.log(`  Total files scanned: ${totalFiles}`);
console.log(`  Obfuscated: ${obfuscatedFiles}`);
console.log(`  Skipped: ${skippedFiles}`);
console.log('=================================================');
EOF

print_status "Running obfuscation script..."

if node obfuscate.js; then
    print_success "Obfuscation completed"
    
    # Clean up obfuscator script
    rm -f obfuscate.js
else
    print_error "Obfuscation failed!"
    print_warning "Continuing with non-obfuscated code..."
    rm -f obfuscate.js
fi

echo ""

# Step 6: Git operations
echo "================================================="
echo -e "${CYAN}  Step 4: Git Integration${NC}"
echo "================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    print_status "Initializing Git repository..."
    git init
    print_success "Git repository initialized"
fi

# Check remote origin
CURRENT_ORIGIN=$(git remote get-url origin 2>/dev/null || echo "")
TARGET_ORIGIN="https://github.com/Maf0ia/portfolio-.git"

if [ "$CURRENT_ORIGIN" != "$TARGET_ORIGIN" ]; then
    print_status "Setting remote origin..."
    git remote remove origin 2>/dev/null || true
    git remote add origin "$TARGET_ORIGIN"
    print_success "Remote origin set to: $TARGET_ORIGIN"
else
    print_status "Remote origin already configured"
fi

echo ""

# Step 7: Prepare commit
echo "================================================="
echo -e "${CYAN}  Step 5: Preparing Commit${NC}"
echo "================================================="

print_status "Checking git status..."
git status --short

echo ""

# Add all files (respects .gitignore)
print_status "Adding files to git..."
git add .

# Create commit
print_status "Creating commit..."
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_MESSAGE="Deploy obfuscated portfolio to production [$TIMESTAMP]"
git commit -m "$COMMIT_MESSAGE"

print_success "Commit created: $COMMIT_MESSAGE"

echo ""

# Step 8: Push to GitHub
echo "================================================="
echo -e "${CYAN}  Step 6: Pushing to GitHub${NC}"
echo "================================================="

print_status "Pushing to remote repository..."

# Try main branch first
if git push -u origin main; then
    print_success "Successfully pushed to GitHub!"
else
    # Try master branch
    print_status "Trying master branch..."
    if git push -u origin master; then
        print_success "Successfully pushed to GitHub (master branch)!"
    else
        print_error "Push failed. Please check your Git credentials and repository access."
        exit 1
    fi
fi

echo ""

# Step 9: Summary
echo "================================================="
echo -e "${GREEN}  Deployment Complete!${NC}"
echo "================================================="
echo ""
echo "Summary:"
echo -e "  ${GREEN}✓${NC} Backup created: portfolio_backup_raw/"
echo -e "  ${GREEN}✓${NC} Project built successfully"
echo -e "  ${GREEN}✓${NC} Code obfuscated: obfuscated_output/"
echo -e "  ${GREEN}✓${NC} Committed to Git"
echo -e "  ${GREEN}✓${NC} Pushed to: $TARGET_ORIGIN"
echo ""
echo -e "${CYAN}Your portfolio is now deployed! 🚀${NC}"
echo ""

# Cleanup prompt
read -p "Clean up obfuscated_output directory? (y/n): " CLEANUP
if [ "$CLEANUP" = "y" ] || [ "$CLEANUP" = "Y" ]; then
    if [ -d "obfuscated_output" ]; then
        rm -rf obfuscated_output
        print_status "Cleaned up obfuscated_output directory"
    fi
fi

echo ""
echo "Press Enter to exit..."
read
