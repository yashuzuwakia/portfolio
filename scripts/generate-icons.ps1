# Renders the favicon/app icons and the Open Graph share image into /public.
# Usage: powershell -ExecutionPolicy Bypass -File scripts/generate-icons.ps1
Add-Type -AssemblyName System.Drawing

$public = Join-Path $PSScriptRoot '..\public' | Resolve-Path
$violet = [System.Drawing.Color]::FromArgb(255, 139, 92, 246)
$cyan = [System.Drawing.Color]::FromArgb(255, 34, 211, 238)

function New-RoundedRect([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    return $path
}

function New-Graphics($bitmap) {
    $g = [System.Drawing.Graphics]::FromImage($bitmap)
    $g.SmoothingMode = 'AntiAlias'
    $g.TextRenderingHint = 'AntiAliasGridFit'
    $g.InterpolationMode = 'HighQualityBicubic'
    return $g
}

function Draw-Mark($g, [float]$x, [float]$y, [float]$size) {
    $rect = New-Object System.Drawing.RectangleF($x, $y, $size, $size)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $violet, $cyan, 45)
    $g.FillPath($brush, (New-RoundedRect $x $y $size $size ($size * 0.25)))

    $font = New-Object System.Drawing.Font('Segoe UI', ($size * 0.42), [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = 'Center'
    $format.LineAlignment = 'Center'
    $textRect = New-Object System.Drawing.RectangleF($x, ($y + $size * 0.02), $size, $size)
    $g.DrawString('YC', $font, [System.Drawing.Brushes]::White, $textRect, $format)
}

function Save-Icon([int]$size, [string]$name) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = New-Graphics $bmp
    Draw-Mark $g 0 0 $size
    $g.Dispose()
    $bmp.Save((Join-Path $public $name), [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

function Get-PngBytes([int]$size) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = New-Graphics $bmp
    Draw-Mark $g 0 0 $size
    $g.Dispose()
    $stream = New-Object System.IO.MemoryStream
    $bmp.Save($stream, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    return , $stream.ToArray()
}

function Save-Ico([int[]]$sizes, [string]$name) {
    $images = $sizes | ForEach-Object { , (Get-PngBytes $_) }
    $out = New-Object System.IO.MemoryStream
    $w = New-Object System.IO.BinaryWriter($out)
    $w.Write([UInt16]0); $w.Write([UInt16]1); $w.Write([UInt16]$sizes.Count)
    $offset = 6 + 16 * $sizes.Count
    for ($i = 0; $i -lt $sizes.Count; $i++) {
        $s = $sizes[$i]
        $dim = if ($s -ge 256) { 0 } else { $s }
        $w.Write([byte]$dim); $w.Write([byte]$dim); $w.Write([byte]0); $w.Write([byte]0)
        $w.Write([UInt16]1); $w.Write([UInt16]32)
        $w.Write([UInt32]$images[$i].Length); $w.Write([UInt32]$offset)
        $offset += $images[$i].Length
    }
    foreach ($img in $images) { $w.Write($img) }
    $w.Flush()
    [System.IO.File]::WriteAllBytes((Join-Path $public $name), $out.ToArray())
}

function Save-OgImage([string]$name) {
    $W = 1200; $H = 630
    $bmp = New-Object System.Drawing.Bitmap($W, $H)
    $g = New-Graphics $bmp
    $g.Clear([System.Drawing.Color]::FromArgb(255, 7, 9, 15))

    foreach ($glow in @(@(-150, -250, 700, $violet, 90), @(750, 250, 650, $cyan, 70))) {
        $path = New-Object System.Drawing.Drawing2D.GraphicsPath
        $path.AddEllipse([float]$glow[0], [float]$glow[1], [float]$glow[2], [float]$glow[2])
        $pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
        $pgb.CenterColor = [System.Drawing.Color]::FromArgb($glow[4], $glow[3])
        $pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $glow[3]))
        $g.FillPath($pgb, $path)
    }

    $gridPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(14, 255, 255, 255), 1)
    for ($x = 0; $x -le $W; $x += 60) { $g.DrawLine($gridPen, $x, 0, $x, $H) }
    for ($y = 0; $y -le $H; $y += 60) { $g.DrawLine($gridPen, 0, $y, $W, $y) }

    Draw-Mark $g 90 110 110

    $white = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 238, 241, 248))
    $muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 154, 163, 184))
    $accent = New-Object System.Drawing.SolidBrush($cyan)
    $px = [System.Drawing.GraphicsUnit]::Pixel
    $g.DrawString('Yashwant Choudhary', (New-Object System.Drawing.Font('Segoe UI', 78, [System.Drawing.FontStyle]::Bold, $px)), $white, 80, 260)
    $dot = '  ' + [char]0x00B7 + '  '
    $g.DrawString(('Full Stack Developer', 'React', 'JavaScript', 'Node.js' -join $dot), (New-Object System.Drawing.Font('Segoe UI', 34, [System.Drawing.FontStyle]::Regular, $px)), $muted, 86, 375)
    $g.DrawString('yashwantchoudhary.in', (New-Object System.Drawing.Font('Consolas', 30, [System.Drawing.FontStyle]::Regular, $px)), $accent, 88, 500)

    $g.Dispose()
    $bmp.Save((Join-Path $public $name), [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Save-Ico @(16, 32, 48) 'favicon.ico'
Save-Icon 180 'apple-touch-icon.png'
Save-Icon 192 'logo192.png'
Save-Icon 512 'logo512.png'
Save-OgImage 'og-image.png'
Get-ChildItem $public -Include *.png, *.ico -Recurse | Select-Object Name, Length
