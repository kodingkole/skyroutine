$shell = New-Object -ComObject WScript.Shell
$startupPath = [System.IO.Path]::Combine($env:APPDATA, 'Microsoft\Windows\Start Menu\Programs\Startup')
$shortcutPath = [System.IO.Path]::Combine($startupPath, 'SkyRoutine_Server.lnk')
$shortcut = $shell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = 'g:\koding kole routine\Start_SkyRoutine.bat'
$shortcut.WorkingDirectory = 'g:\koding kole routine'
$shortcut.WindowStyle = 7
$shortcut.Save()
