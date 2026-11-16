param(
    [ValidateRange(1, 65535)]
    [int]$Port = 3000
)

$ErrorActionPreference = 'Stop'
$frontendPath = Join-Path $PSScriptRoot 'frontend'
$previousPort = $env:PORT
$exitCode = 0

if (-not (Get-Command node -ErrorAction SilentlyContinue) -or
    -not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
    throw 'Install Node.js and npm, then run this script again.'
}

Push-Location -LiteralPath $frontendPath
try {
    if (-not (Test-Path -LiteralPath 'node_modules/next/dist/bin/next')) {
        Write-Host 'Installing frontend dependencies...'
        & npm.cmd ci
        if ($LASTEXITCODE -ne 0) {
            throw 'Dependency installation failed. See the npm output above.'
        }
    }

    $env:PORT = [string]$Port
    Write-Host "Starting frontend at http://localhost:$Port"
    Write-Host 'Press Ctrl+C to stop.'
    & npm.cmd run dev
    $exitCode = $LASTEXITCODE
}
finally {
    $env:PORT = $previousPort
    Pop-Location
}

exit $exitCode
