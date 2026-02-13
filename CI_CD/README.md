# 中央协调器 - 目录变更自动提交工具

## 功能概述

中央协调器是一个自动化工具，用于检测指定目录的变更，并将这些变更自动提交到对应的Git分支。该工具解决了以下问题：

1. **目录与分支的自动映射**：不同目录的变更自动提交到对应的分支
2. **分支状态管理**：确保提交前分支是干净的
3. **代码同步**：自动拉取最新代码
4. **操作自动化**：减少重复的Git操作
5. **错误处理**：包含完整的错误处理和日志记录

## 目录与分支映射

| 目录 | 对应分支 |
|------|----------|
| requirement/ | feature/ui-desiger-bot |
| frontend/ | feature/frontend-bot |
| backend/ | feature/backend-bot |

## 工具版本

本工具提供两个版本：

1. **Python版本** (`orchestrator.py`)：适用于有Python环境的系统
2. **PowerShell版本** (`orchestrator.ps1`)：适用于Windows系统，无需额外安装Python

## 环境要求

### Python版本
- Python 3.6+
- Git 2.0+
- （可选）conda环境（如ai-develop）

### PowerShell版本
- Windows PowerShell 5.1+ 或 PowerShell 7+
- Git 2.0+

## 安装与配置

1. **确保Git已安装**：在命令行中运行 `git --version` 验证Git是否安装
2. **克隆仓库**：如果尚未克隆仓库，请先克隆
3. **配置Git用户信息**：确保已设置Git用户名和邮箱
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```
4. **确保远程分支存在**：工具会自动使用已存在的远程分支

## 使用方法

### Python版本

1. **激活Python环境**（如果使用conda）：
   ```bash
   conda activate ai-develop
   ```

2. **运行脚本**：
   ```bash
   # 在项目根目录下
   python CI_CD/orchestrator.py
   ```

### PowerShell版本

1. **打开PowerShell**：在项目根目录下打开PowerShell

2. **运行脚本**：
   ```powershell
   # 在项目根目录下
   .\CI_CD\orchestrator.ps1
   ```

## 工作流程

1. **检测目录变更**：工具会检查每个配置的目录是否有未提交的更改
2. **保存当前状态**：如果当前分支不干净，工具会暂存更改
3. **切换到目标分支**：根据目录与分支的映射关系，切换到对应的分支
4. **拉取最新代码**：确保目标分支是最新的
5. **提交更改**：将目录的更改提交到目标分支
6. **推送更改**：将提交推送到远程仓库
7. **恢复原状态**：切回原分支并恢复暂存的更改

## 日志记录

工具会在 `CI_CD` 目录下生成 `orchestrator.log` 文件，记录所有操作和错误信息。日志格式如下：

```
[2026-01-28 23:23:11] [INFO] 开始执行中央协调器
[2026-01-28 23:23:11] [INFO] 检查目录: requirement -> 分支: feature/ui-desiger-bot
[2026-01-28 23:23:11] [INFO] 当前分支: develop
[2026-01-28 23:23:11] [WARNING] 当前分支不干净，尝试暂存更改
[2026-01-28 23:23:11] [INFO] 切换到分支: feature/ui-desiger-bot
[2026-01-28 23:23:11] [INFO] 拉取分支 feature/ui-desiger-bot 的最新代码
[2026-01-28 23:23:15] [INFO] 提交 requirement 目录的更改到分支 feature/ui-desiger-bot
[2026-01-28 23:23:15] [INFO] 推送分支 feature/ui-desiger-bot 的更改到远程仓库
[2026-01-28 23:23:15] [SUCCESS] 成功处理 requirement 目录的变更
[2026-01-28 23:23:15] [INFO] 切回原分支: develop
[2026-01-28 23:23:15] [INFO] 切换到分支: develop
[2026-01-28 23:23:15] [INFO] 恢复暂存的更改
[2026-01-28 23:23:15] [INFO] 中央协调器执行完成
```

## 常见问题与解决方案

### 1. 脚本执行失败，提示Git命令错误

**原因**：可能是Git命令执行失败，如分支不存在、网络问题等。

**解决方案**：
- 检查Git是否正确安装
- 检查网络连接
- 确保目标分支存在
- 查看日志文件获取详细错误信息

### 2. 提交失败，提示无更改

**原因**：可能是目录中没有未提交的更改，或者更改已经被提交。

**解决方案**：
- 检查目录是否有实际更改
- 运行 `git status` 查看当前状态

### 3. 脚本运行缓慢

**原因**：可能是网络连接较慢，或者需要拉取大量代码。

**解决方案**：
- 确保网络连接稳定
- 考虑在网络条件好的时候运行

## 高级配置

### 自定义目录与分支映射

如需修改目录与分支的映射关系，可编辑脚本中的 `DIR_BRANCH_MAP` 变量：

**Python版本**（orchestrator.py）：
```python
DIR_BRANCH_MAP = {
    "requirement": "feature/ui-desiger-bot",
    "frontend": "feature/frontend-bot",
    "backend": "feature/backend-bot"
}
```

**PowerShell版本**（orchestrator.ps1）：
```powershell
$DIR_BRANCH_MAP = @{
    "requirement" = "feature/ui-desiger-bot"
    "frontend" = "feature/frontend-bot"
    "backend" = "feature/backend-bot"
}
```

### 调整日志级别

脚本默认记录所有级别的日志。如需调整，可修改 `log` 函数的实现。

## 集成到开发流程

### 手动运行

在完成目录修改后，手动运行脚本提交更改。

### 集成到IDE

可以将脚本配置为IDE的外部工具，方便快速执行。

### 集成到CI/CD

可以将脚本集成到CI/CD流程中，实现自动检测和提交。

## 注意事项

1. **安全性**：脚本会执行Git命令，确保在安全的环境中运行
2. **网络连接**：需要网络连接以拉取和推送代码
3. **Git权限**：确保有足够的权限推送到远程仓库
4. **分支冲突**：如果存在分支冲突，脚本会记录错误，需要手动解决
5. **文件大小**：对于大型文件，可能需要配置Git LFS

## 故障排除

1. **查看日志**：检查 `CI_CD/orchestrator.log` 文件获取详细信息
2. **手动执行Git命令**：对于失败的操作，尝试手动执行对应的Git命令排查问题
3. **检查Git状态**：运行 `git status` 和 `git branch -a` 了解当前状态
4. **更新Git**：确保使用最新版本的Git

## 示例输出

以下是脚本执行的典型输出示例：

```
[2026-01-28 23:21:20] [INFO] 开始执行中央协调器
[2026-01-28 23:21:20] [INFO] 
检查目录: backend -> 分支: feature/backend-bot
[2026-01-28 23:21:20] [INFO] 目录无变更: backend
[2026-01-28 23:21:20] [INFO] 
检查目录: requirement -> 分支: feature/ui-desiger-bot
[2026-01-28 23:21:20] [INFO] 当前分支: develop
[2026-01-28 23:21:20] [WARNING] 当前分支不干净，尝试暂存更改
Saved working directory and index state On develop: 临时暂存更改
[2026-01-28 23:21:20] [INFO] 切换到分支: feature/ui-desiger-bot
Switched to branch 'feature/ui-desiger-bot'
[2026-01-28 23:21:20] [INFO] 拉取分支 feature/ui-desiger-bot 的最新代码
From github.com:xuwenrui/word-king
 * branch            feature/ui-desiger-bot -> FETCH_HEAD
Already up to date.
[2026-01-28 23:21:25] [INFO] 提交 requirement 目录的更改到分支 feature/ui-desiger-bot
[2026-01-28 23:21:25] [INFO] 推送分支 feature/ui-desiger-bot 的更改到远程仓库
Everything up-to-date
[2026-01-28 23:21:29] [SUCCESS] 成功处理 requirement 目录的变更
[2026-01-28 23:21:29] [INFO] 切回原分支: develop
[2026-01-28 23:21:29] [INFO] 切换到分支: develop
Switched to branch 'develop'
[2026-01-28 23:21:29] [INFO] 恢复暂存的更改
On branch develop
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        deleted:    "requirement/..."

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        CI_CD/

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (...)
[2026-01-28 23:21:29] [INFO] 
检查目录: frontend -> 分支: feature/frontend-bot
[2026-01-28 23:21:29] [INFO] 目录无变更: frontend
[2026-01-28 23:21:29] [INFO] 中央协调器执行完成
```

## 总结

中央协调器工具通过自动化Git操作，解决了多目录多分支的代码管理问题，减少了重复操作，提高了开发效率。工具提供了Python和PowerShell两个版本，适用于不同的环境需求，具有良好的可配置性和扩展性。

---

**版本**：1.0.0
**更新日期**：2026-01-28
**维护者**：CI/CD Team
