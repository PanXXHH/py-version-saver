import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

class VersionControl {
    dirPath: string;
    versionDigits: number;
    keepVersions: number;
    currentVersion: string | null;

    constructor(dirPath: string, versionDigits: number, keepVersions: number) {
        this.dirPath = dirPath;
        this.versionDigits = versionDigits;
        this.keepVersions = keepVersions;
        this.currentVersion = this.loadVersions(dirPath, versionDigits);
    }

    loadVersions(dirPath: string, versionDigits: number) {
        // 如果目录不存在，则创建它
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        const versionFiles = fs.readdirSync(dirPath).filter(fileName => /^\d+(\.\d)*$/.test(fileName))
            .filter(fileName => fileName.split('.').length === versionDigits);

        if (versionFiles.length > 0) {
            versionFiles.sort((a, b) => {
                const versionA = a.split('.').map(num => parseInt(num));
                const versionB = b.split('.').map(num => parseInt(num));
                console.log(versionA,versionB);
                for (let i = 0; i < versionA.length; i++) {
                    if (versionA[i] !== versionB[i]) {
                        return versionA[i] - versionB[i];
                    }
                }
                return 0;
            });
            return versionFiles[versionFiles.length - 1];
        }

        return null; // 在没有找到符合条件的版本文件时返回 null
    }

    incrementVersion() {
        let newVersion = '';
        if (this.currentVersion === null) {
            newVersion = '1' + '.0'.repeat(this.versionDigits - 1);
        } else {
            const versionNumbers = this.currentVersion.split('.').map(num => parseInt(num));
            for (let i = this.versionDigits - 1; i >= 0; i--) {
                if (i === 0) {
                    versionNumbers[i] += 1;
                    break;
                } else if (versionNumbers[i] < 9) {
                    versionNumbers[i] += 1;
                    break;
                } else {
                    versionNumbers[i] = 0;
                }
            }
            newVersion = versionNumbers.join('.');
        }

        const newDir = path.join(this.dirPath, newVersion);
        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir, { recursive: true });
        }
        this.currentVersion = newVersion;

        if (this.versionDigits > 1) {
            const versionFiles = fs.readdirSync(this.dirPath).filter(fileName => /^(\d+\.)*\d+$/.test(fileName))
                .filter(fileName => fileName.split('.').length === this.versionDigits);
            versionFiles.sort((a, b) => {
                const versionA = a.split('.').map(num => parseInt(num));
                const versionB = b.split('.').map(num => parseInt(num));
                for (let i = 0; i < versionA.length; i++) {
                    if (versionA[i] !== versionB[i]) {
                        return versionA[i] - versionB[i];
                    }
                }
                return 0;
            });

            const versionsToKeepMajor = versionFiles.filter(version => {
                const versionParts = version.split('.');
                for (let i = 1; i < versionParts.length; i++) {
                    if (versionParts[i] !== '0') {
                        return false;
                    }
                }
                return true;
            });

            const versionsToKeepMinor: string[] = [];
            for (let i = 0; i < this.versionDigits - 1; i++) {
                versionsToKeepMinor.push(...versionFiles.filter(version => {
                    const versionParts = version.split('.');
                    for (let j = i + 1; j < versionParts.length; j++) {
                        if (versionParts[j] !== '0') {
                            return false;
                        }
                    }
                    return true;
                }).slice(-this.keepVersions));
            }

            versionsToKeepMinor.push(...versionFiles.slice(-this.keepVersions));

            const versionsToKeep = versionsToKeepMajor.concat(versionsToKeepMinor);
            const versionsToDelete = versionFiles.filter(version => !versionsToKeep.includes(version));

            for (const version of versionsToDelete) {
                fs.rmSync(path.join(this.dirPath, version), { recursive: true, force: true });
            }
        }
    }
}

export function activate(context: vscode.ExtensionContext) {
    // console.log('Extension "py-version-saver" is now active!');

    vscode.workspace.onDidSaveTextDocument(async (document) => {
        // console.log("Save event triggered.");
        // vscode.window.showInformationMessage("Save event triggered.");
        await onSave(document);
    });
}

async function onSave(document: vscode.TextDocument) {
    if (document.isUntitled || !document.fileName) {
        return;
    }

    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
    if (!workspaceFolder) {
        return;
    }

    const workspaceFolderPath = workspaceFolder.uri.fsPath;
    const config = vscode.workspace.getConfiguration('py-version-saver');
    const versionsDirectory = path.join(workspaceFolderPath, config.get('versionsDirectory', '.versions'));
    const versionDigits = config.get('versionDigits', 3);
    const keepVersions = config.get('keepVersions', 9);
    // 从配置中读取支持的扩展名和忽略规则
    const supportedExtensions = config.get('supportedExtensions', ['.py', '.log']);
    const ignorePatterns = config.get('ignore', ['.*']);


    const versionControl = new VersionControl(versionsDirectory, versionDigits, keepVersions);
    versionControl.incrementVersion();

    // 构建 glob 搜索模式字符串
    const extensionsPattern = supportedExtensions.map(ext => `*${ext}`).join('|');
    const selectedFiles = glob.sync(`**/+(${extensionsPattern})`, {
        cwd: workspaceFolderPath,
        ignore: ignorePatterns, // 使用配置中的忽略规则
    });

    for (const file of selectedFiles) {
        const fileContent = fs.readFileSync(path.join(workspaceFolderPath, file), 'utf8');
        const targetFileDirectory = path.join(versionControl.dirPath, versionControl.currentVersion!, path.dirname(file));
        const targetFilePath = path.join(targetFileDirectory, path.basename(file));

        fs.mkdirSync(targetFileDirectory, { recursive: true });
        fs.writeFileSync(targetFilePath, fileContent, 'utf8');
    }

    vscode.window.showInformationMessage(`已将文件保存到新文件夹：${versionControl.dirPath}/${versionControl.currentVersion}`);
}


export function deactivate() { }
