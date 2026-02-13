<#
中央协调器 - 目录变更自动提交到对应分支

功能：
1. 检测指定目录的变更
2. 确保对应分支是干净的并拉取最新代码
3. 将变更提交到对应分支
4. 推送更改到远程仓库

目录与分支映射：
- requirement/ -> feature/ui-desiger-bot
- frontend/ -> feature/frontend-bot
- backend/ -> feature/backend-bot
#>

# 配置：目录与分支映射
$DIR_BRANCH_MAP = @{
    "requirement" = "feature/ui-desiger-bot"
    "frontend" = "feature/frontend-bot"
    "backend" = "feature/backend-bot"
}

# 项目根目录
$PROJECT_ROOT = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

# 日志文件路径
$LOG_FILE = Join-Path (Split-Path -Parent $MyInvocation.MyCommand.Path) "orchestrator.log"

function Write-Log {
    <# 记录日志 #>
    param(
        [string]$Message,
        [string]$Level = "INFO"
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] [$Level] $Message"
    Write-Host $logMessage
    Add-Content -Path $LOG_FILE -Value $logMessage -Encoding UTF8
}

function Invoke-GitCommand {
    <# 执行Git命令并返回结果 #>
    param(
        [string]$Command,
        [string]$Cwd = $PROJECT_ROOT
    )
    try {
        $result = Invoke-Expression -Command "git -C '$Cwd' $Command"
        return $result
    } catch {
        Write-Log "Git命令执行失败: git $Command" "ERROR"
        Write-Log "错误输出: $($_.Exception.Message)" "ERROR"
        throw
    }
}

function Test-DirectoryExists {
    <# 检查目录是否存在 #>
    param(
        [string]$Directory
    )
    $dirPath = Join-Path $PROJECT_ROOT $Directory
    return Test-Path -Path $dirPath -PathType Container
}

function Test-HasChanges {
    <# 检查目录是否有未提交的更改 #>
    param(
        [string]$Directory
    )
    try {
        $result = Invoke-GitCommand "status --porcelain $Directory"
        return ![string]::IsNullOrEmpty($result)
    } catch {
        return $false
    }
}

function Test-IsBranchClean {
    <# 检查当前分支是否干净 #>
    try {
        $result = Invoke-GitCommand "status --porcelain"
        return [string]::IsNullOrEmpty($result)
    } catch {
        return $false
    }
}

function Get-CurrentBranch {
    <# 获取当前分支名称 #>
    return Invoke-GitCommand "rev-parse --abbrev-ref HEAD"
}

function Switch-Branch {
    <# 切换到指定分支 #>
    param(
        [string]$Branch
    )
    Write-Log "切换到分支: $Branch"
    Invoke-GitCommand "checkout $Branch"
}

function Pull-Latest {
    <# 拉取分支最新代码 #>
    param(
        [string]$Branch
    )
    Write-Log "拉取分支 $Branch 的最新代码"
    Invoke-GitCommand "pull origin $Branch"
}

function Commit-Changes {
    <# 提交目录更改到分支 #>
    param(
        [string]$Directory,
        [string]$Branch
    )
    Write-Log "提交 $Directory 目录的更改到分支 $Branch"
    Invoke-GitCommand "add $Directory"
    $commitMessage = "[自动提交] $Directory 目录更改 - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    Invoke-GitCommand "commit -m '$commitMessage'"
}

function Push-Changes {
    <# 推送更改到远程仓库 #>
    param(
        [string]$Branch
    )
    Write-Log "推送分支 $Branch 的更改到远程仓库"
    Invoke-GitCommand "push origin $Branch"
}

function Handle-DirectoryChanges {
    <# 处理目录变更 #>
    param(
        [string]$Directory,
        [string]$Branch
    )
    if (-not (Test-DirectoryExists $Directory)) {
        Write-Log "目录不存在: $Directory" "WARNING"
        return
    }

    if (-not (Test-HasChanges $Directory)) {
        Write-Log "目录无变更: $Directory"
        return
    }

    # 保存当前分支
    $currentBranch = Get-CurrentBranch
    Write-Log "当前分支: $currentBranch"

    try {
        # 确保当前分支是干净的
        if (-not (Test-IsBranchClean)) {
            Write-Log "当前分支不干净，尝试暂存更改" "WARNING"
            Invoke-GitCommand "stash push -m '临时暂存更改'"
        }

        # 切换到目标分支
        Switch-Branch $Branch

        # 拉取最新代码
        Pull-Latest $Branch

        # 提交更改
        Commit-Changes $Directory $Branch

        # 推送更改
        Push-Changes $Branch

        Write-Log "成功处理 $Directory 目录的变更" "SUCCESS"

    } catch {
        Write-Log "处理 $Directory 目录变更时出错: $($_.Exception.Message)" "ERROR"

    } finally {
        # 切回原分支
        if ((Get-CurrentBranch) -ne $currentBranch) {
            Write-Log "切回原分支: $currentBranch"
            Switch-Branch $currentBranch
        }

        # 恢复暂存的更改
        try {
            $stashResult = Invoke-GitCommand "stash list"
            if ($stashResult -like "*临时暂存更改*") {
                Write-Log "恢复暂存的更改"
                Invoke-GitCommand "stash pop"
            }
        } catch {
            # 忽略恢复暂存时的错误
        }
    }
}

function Main {
    <# 主函数 #>
    Write-Log "开始执行中央协调器"

    # 检查是否在Git仓库中
    if (-not (Test-Path -Path (Join-Path $PROJECT_ROOT ".git") -PathType Container)) {
        Write-Log "错误: 当前目录不是Git仓库" "ERROR"
        return 1
    }

    # 处理每个目录
    foreach ($directory in $DIR_BRANCH_MAP.Keys) {
        $branch = $DIR_BRANCH_MAP[$directory]
        Write-Log "`n检查目录: $directory -> 分支: $branch"
        Handle-DirectoryChanges $directory $branch
    }

    Write-Log "中央协调器执行完成"
    return 0
}

# 执行主函数
Main
