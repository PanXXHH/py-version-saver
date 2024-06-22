<p align="left">
    <a href="./README_CN.md">中文</a>&nbsp ｜ &nbspEnglish&nbsp 
</p>


# PyVersionSaver - VSCode Extension

PyVersionSaver is a version control extension for Visual Studio Code. Whenever you save a file in your workspace, it will automatically create a new version and retain a specified number of historical versions.

 "2024-06-22"

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
