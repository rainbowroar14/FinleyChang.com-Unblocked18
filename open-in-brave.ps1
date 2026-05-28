$ErrorActionPreference = "Stop"

$projectRoot = $PSScriptRoot
$indexFile = Join-Path $projectRoot "index.html"
$indexUri = [Uri]$indexFile

$braveCandidates = @(
  "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe",
  "${env:ProgramFiles(x86)}\BraveSoftware\Brave-Browser\Application\brave.exe",
  "$env:LOCALAPPDATA\BraveSoftware\Brave-Browser\Application\brave.exe"
)

$brave = $braveCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $brave) {
  Write-Error "Brave was not found. Install Brave from https://brave.com/download/"
  exit 1
}

Write-Host "Opening in Brave: $indexUri"
Start-Process -FilePath $brave -ArgumentList $indexUri.AbsoluteUri
