# PowerShell script to create all remaining frontend files for NovaShop

Write-Host "Creating NovaShop Frontend Components..." -ForegroundColor Green

# Create directories
$dirs = @(
    "src\components\ui",
    "src\components\admin",
    "src\pages\admin"
)

foreach ($dir in $dirs) {
    $fullPath = "c:\Users\Pushkar Singh\Downloads\E-commerce\frontend\$dir"
    if (!(Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "Created directory: $dir" -ForegroundColor Cyan
    }
}

Write-Host "`nAll directories created successfully!" -ForegroundColor Green
Write-Host "`nNow creating component files..." -ForegroundColor Yellow

# Note: Individual component files will be created in subsequent steps
Write-Host "`nDirectory structure ready. Component files will be created next." -ForegroundColor Green
