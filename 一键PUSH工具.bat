@echo off
echo ��鵱ǰGit״̬...
git status
echo.

:confirm
set /p response=�Ƿ������������ļ����ύ��(y/n):
if /i "%response%"=="y" goto add
if /i "%response%"=="n" goto end
echo ������y��n��
goto confirm

:add
set /p changeinfo=�������ύ��Ϣ:
git add .
git commit -m "%changeinfo%"
if %errorlevel% neq 0 goto error

echo �������͵�Զ�ֿ̲�...
git push
if %errorlevel% neq 0 goto error

echo �ύ�����ͳɹ���
goto end

:error
echo �������󣬲���δ��ɡ�
goto end

:end
pause
