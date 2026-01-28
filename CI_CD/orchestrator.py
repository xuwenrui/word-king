#!/usr/bin/env python3
"""
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
"""

import os
import subprocess
import sys
from datetime import datetime

# 配置：目录与分支映射
DIR_BRANCH_MAP = {
    "requirement": "feature/ui-desiger-bot",
    "frontend": "feature/frontend-bot",
    "backend": "feature/backend-bot"
}

# 项目根目录
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# 日志文件路径
LOG_FILE = os.path.join(os.path.dirname(__file__), "orchestrator.log")

def log(message, level="INFO"):
    """记录日志"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] [{level}] {message}"
    print(log_message)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_message + "\n")

def run_git_command(cmd_args, cwd=PROJECT_ROOT):
    """执行Git命令并返回结果"""
    try:
        # 确保cmd_args是列表
        if isinstance(cmd_args, str):
            # 对于简单命令，使用split
            cmd_args = cmd_args.split()
        
        # 构建完整命令
        full_cmd = ["git"] + cmd_args
        
        result = subprocess.run(
            full_cmd,
            cwd=cwd,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        log(f"Git命令执行失败: {' '.join(['git'] + cmd_args)}", "ERROR")
        log(f"错误输出: {e.stderr}", "ERROR")
        raise

def check_directory_exists(directory):
    """检查目录是否存在"""
    dir_path = os.path.join(PROJECT_ROOT, directory)
    return os.path.exists(dir_path) and os.path.isdir(dir_path)

def has_changes(directory):
    """检查目录是否有未提交的更改"""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain", directory],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            check=True
        )
        return bool(result.stdout.strip())
    except subprocess.CalledProcessError:
        return False

def is_branch_clean():
    """检查当前分支是否干净"""
    try:
        result = subprocess.run(
            ["git", "status", "--porcelain"],
            cwd=PROJECT_ROOT,
            capture_output=True,
            text=True,
            check=True
        )
        return not bool(result.stdout.strip())
    except subprocess.CalledProcessError:
        return False

def get_current_branch():
    """获取当前分支名称"""
    return run_git_command("rev-parse --abbrev-ref HEAD")

def switch_branch(branch):
    """切换到指定分支"""
    log(f"切换到分支: {branch}")
    run_git_command(f"checkout {branch}")

def pull_latest(branch):
    """拉取分支最新代码"""
    log(f"拉取分支 {branch} 的最新代码")
    run_git_command("pull origin " + branch)

def commit_changes(directory, branch):
    """提交目录更改到分支"""
    log(f"提交 {directory} 目录的更改到分支 {branch}")
    run_git_command(["add", directory])
    commit_message = f"[自动提交] {directory} 目录更改 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    run_git_command(["commit", "-m", commit_message])

def push_changes(branch):
    """推送更改到远程仓库"""
    log(f"推送分支 {branch} 的更改到远程仓库")
    run_git_command(f"push origin {branch}")

def handle_directory_changes(directory, branch):
    """处理目录变更"""
    if not check_directory_exists(directory):
        log(f"目录不存在: {directory}", "WARNING")
        return

    if not has_changes(directory):
        log(f"目录无变更: {directory}")
        return

    # 保存当前分支
    current_branch = get_current_branch()
    log(f"当前分支: {current_branch}")

    try:
        # 确保当前分支是干净的
        if not is_branch_clean():
            log("当前分支不干净，尝试暂存更改", "WARNING")
            run_git_command("stash push -m \"临时暂存更改\"")

        # 切换到目标分支
        switch_branch(branch)

        # 拉取最新代码
        pull_latest(branch)

        # 提交更改
        commit_changes(directory, branch)

        # 推送更改
        push_changes(branch)

        log(f"成功处理 {directory} 目录的变更", "SUCCESS")

    except Exception as e:
        log(f"处理 {directory} 目录变更时出错: {str(e)}", "ERROR")

    finally:
        # 切回原分支
        if current_branch != get_current_branch():
            log(f"切回原分支: {current_branch}")
            switch_branch(current_branch)

        # 恢复暂存的更改
        try:
            stash_result = subprocess.run(
                ["git", "stash", "list"],
                cwd=PROJECT_ROOT,
                capture_output=True,
                text=True,
                check=True
            )
            if "临时暂存更改" in stash_result.stdout:
                log("恢复暂存的更改")
                run_git_command("stash pop")
        except:
            pass

def main():
    """主函数"""
    log("开始执行中央协调器")

    # 检查是否在Git仓库中
    if not os.path.exists(os.path.join(PROJECT_ROOT, ".git")):
        log("错误: 当前目录不是Git仓库", "ERROR")
        return 1

    # 处理每个目录
    for directory, branch in DIR_BRANCH_MAP.items():
        log(f"\n检查目录: {directory} -> 分支: {branch}")
        handle_directory_changes(directory, branch)

    log("中央协调器执行完成")
    return 0

if __name__ == "__main__":
    sys.exit(main())
