import os as __os


def __get_latest_version(versions_directory):
    """获取版本目录中最新的版本号"""
    if not __os.path.exists(versions_directory) or not __os.path.isdir(versions_directory):
        return None

    versions = [d for d in __os.listdir(versions_directory) if __os.path.isdir(__os.path.join(versions_directory, d))]
    if not versions:
        return None

    versions.sort(key=lambda s: list(map(int, s.split('.'))))
    return versions[-1]

__versions_directory = ".versions"

# APP配置
VERSION = __get_latest_version(__versions_directory) #为空的化不指定，需手动获取最新版本
LICENSE = "GPL-3.0"
AUTHOR = "Xiaohui Pan"
PROJECT_NAME = "PyVersionSaver"
PROJECT_ALIAS = "py-version-saver"
COPYRIGHT = "Copyright (C) 2024 PanXXHH <https://github.com/PanXXHH>"
REPOSITORY_URL = "https://github.com/PanXXHH/py-version-saver"
# ORIGINAL_AUTHOR = "T3rry7f"
# ORIGINAL_AUTHOR_URL = "https://github.com/T3rry7f"
# ORIGINAL_VERSION = "1.0"
# ORIGINAL_REPOSITORY_URL = "https://github.com/T3rry7f/Fake115Upload"
GITHUB_NAME = "PanXXHH"


# TARGET_PATHS = [r"G:\Program Data\ONEDRIVE\987384390\OneDrive",
#                 r"F:\杂乱文件",
#                 r"G:\Program Data\ownCloudData"]
