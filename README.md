# PyVersionSaver - VSCode Extension

PyVersionSaver is a version control extension for Visual Studio Code. Whenever you save a file in your workspace, it will automatically create a new version and retain a specified number of historical versions.

## How to use

1. Install and enable the PyVersionSaver extension in Visual Studio Code.
2. Open the workspace you want to version control.
3. Set the values for `py-version-saver.versionsDirectory`, `py-version-saver.versionDigits`, and `py-version-saver.keepVersions` in `settings.json`. For example:

    ```json
    {
        "py-version-saver.versionsDirectory": ".versions",
        "py-version-saver.versionDigits": 3,
        "py-version-saver.keepVersions": 9,
    }
    ```

4. When you save a file, the extension will create a new version in the specified directory and automatically delete old versions that exceed the retain quantity.

## Settings

- `py-version-saver.versionsDirectory`: The directory to save the versions. The default is ".versions".
- `py-version-saver.versionDigits`: The number of digits in the version. The default is 3.
- `py-version-saver.keepVersions`: The number of versions to retain. The default is 9.

## Feedback and Suggestions

If you encounter any problems or have any suggestions while using, feel free to [leave your feedback here](your-feedback-link).

## License

This extension is licensed under the [MIT](LICENSE) License.

---

# PyVersionSaver - VSCode 扩展

PyVersionSaver 是一款版本控制的 Visual Studio Code 扩展。每当你保存工作区中的文件时，它会自动创建一个新的版本，并保留指定数量的历史版本。

## 如何使用

1. 在 Visual Studio Code 中安装并启用 PyVersionSaver 扩展。
2. 打开你想进行版本控制的工作区。
3. 在 `settings.json` 中设置 `py-version-saver.versionsDirectory`，`py-version-saver.versionDigits`，和 `py-version-saver.keepVersions`的值。例如：

    ```json
    {
        "py-version-saver.versionsDirectory": ".versions",
        "py-version-saver.versionDigits": 3,
        "py-version-saver.keepVersions": 9,
    }
    ```

4. 当你保存文件时，扩展会在指定的目录中创建新的版本，并自动删除超过保留数量的旧版本。

## 设置项

- `py-version-saver.versionsDirectory`: 保存版本的目录，默认值为 ".versions"。
- `py-version-saver.versionDigits`: 版本号的位数，默认值为 3。
- `py-version-saver.keepVersions`: 保留的版本数量，默认值为 9。

## 反馈与建议

如果你在使用过程中遇到任何问题或有任何建议，欢迎在[此处](你的反馈链接)反馈。

## 版权信息

此扩展遵循 [MIT](LICENSE) 许可证。
