@echo off
title Biopar Website - Servidor Local
cd /d "%~dp0"
echo ======================================================
echo    Iniciando Servidor Local Biopar em http://localhost:3000
echo ======================================================
start http://localhost:3000
node dev-server.js
pause