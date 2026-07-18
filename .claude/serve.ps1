# Minimal static file server for local preview (no Python/Node required)
$root = Split-Path -Parent $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:4173/")
$listener.Start()
Write-Host "Serving $root at http://localhost:4173/"

$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css; charset=utf-8"
  ".js"="text/javascript"; ".png"="image/png"; ".jpg"="image/jpeg"
  ".jpeg"="image/jpeg"; ".svg"="image/svg+xml"; ".pdf"="application/pdf"
  ".ico"="image/x-icon"; ".txt"="text/plain"; ".webp"="image/webp"
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($path -eq "") { $path = "index.html" }
  $file = Join-Path $root $path
  $full = [IO.Path]::GetFullPath($file)
  if ($full.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -and (Test-Path $full -PathType Leaf)) {
    $bytes = [IO.File]::ReadAllBytes($full)
    $ext = [IO.Path]::GetExtension($full).ToLower()
    if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType = $mime[$ext] }
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $body = [Text.Encoding]::UTF8.GetBytes("404 - not found")
    $ctx.Response.OutputStream.Write($body, 0, $body.Length)
  }
  $ctx.Response.Close()
}
