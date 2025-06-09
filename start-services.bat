@echo off
echo Node operations are terminating...
powershell -ExecutionPolicy Bypass -File kill-ports.ps1

echo auth starting...
start /B node auth/index.js
echo auth completed.

echo user starting...
start /B node user/index.js
echo user completed.


pause