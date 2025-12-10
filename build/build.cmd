del stayforever_AD.d64
c1541 -format "stay forever",sf d64 stayforever_AD.d64
call compile.cmd
call ..\build\c1541 ..\build\stayforever_AD.d64 -write ++stayforever.prg "stay forever",p
call ..\build\c1541 ..\build\stayforever_AD.d64 -write ++xam-c.prg xam,p
cd ..\build
cd ..\seq
for %%f in (*.*) do call :add "%%f"
cd ..\build
goto :EOF

:add
..\build\c1541 ..\build\stayforever_AD.d64 -write %1 %1,s
