cd %~dp0

@echo *** Start mongo db server ***
start cmd /k mongod.exe --dbpath mongoDb_Data

timeout 5
@echo *** Start node server ***
start cmd /k node server.js

timeout 5
start chrome.exe "http://localhost:8080/screen=1"

@PAUSE