<# =============================================================================
# PORTFOLIO - AUTO UPDATE SCRIPT (PowerShell for Windows)
# =============================================================================
# This script helps automatically update PROJECT_INFO.md with new changes.
# Run after making significant changes: .\update-log.ps1 -Type "Feature" -Description "Added new project section" -Files "src/sections/Projects.jsx"
# ============================================================================= #>

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("Feature", "Fix", "Refactor", "Style", "Docs", "Config", "Chore")]
    [string]$Type,

    [Parameter(Mandatory=$true)]
    [string]$Description,

    [string[]]$Files = @()
)

$PROJECT_INFO = "PROJECT_INFO.md"
$DATE = Get-Date -Format "yyyy-MM-dd"

# Build file list string
$fileStr = ""
if ($Files.Count -gt 0) {
    $fileStr = " ($($Files -join ', '))"
}

# Create the entry
$entry = "- **$Type**: $Description$fileStr"

# Check if PROJECT_INFO.md exists
if (-not (Test-Path $PROJECT_INFO)) {
    Write-Error "$PROJECT_INFO not found!"
    exit 1
}

# Create backup
Copy-Item $PROJECT_INFO "${PROJECT_INFO}.bak" -Force

# Read file content
$content = Get-Content $PROJECT_INFO -Raw

# Find the [Unreleased] section and insert after it
$pattern = '(### \[Unreleased\].*?\n)(\n|$)'
$replacement = "`$1$entry`n`n"

$updatedContent = $content -replace $pattern, $replacement

# If pattern didn't match (no empty line after), try alternative
if ($updatedContent -eq $content) {
    $pattern = '(### \[Unreleased\].*?\n)(### )'
    $replacement = "`$1$entry`n`n`$2"
    $updatedContent = $content -replace $pattern, $replacement
}

# Write updated content
$updatedContent | Set-Content $PROJECT_INFO -Encoding UTF8

# Clean up backup
Remove-Item "${PROJECT_INFO}.bak" -Force -ErrorAction SilentlyContinue

Write-Host "✓ Updated $PROJECT_INFO" -ForegroundColor Green
Write-Host "  Added: $entry" -ForegroundColor Gray

# Show the updated section
Write-Host "`n--- Updated Section ---" -ForegroundColor Yellow
Select-String -Pattern "### \[Unreleased\]" -Context 0,10 -Path $PROJECT_INFO | ForEach-Object { $_.Context.PostContext } | Select-Object -First 10 | ForEach-Object { Write-Host $_ }