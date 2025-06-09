$ports = @(3001, 3002)

foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        $processId = $connection.OwningProcess
        Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
        Write-Host "Port $port closed (PID $processId)"
    } else {
        Write-Host "Port $port already empty"
    }
}
