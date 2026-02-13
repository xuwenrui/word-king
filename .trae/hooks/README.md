# 任务完成钩子脚本

## 简介

此目录包含任务完成后的钩子脚本，用于在任务执行完成后自动发送飞书通知。

## 钩子脚本列表

### 1. `post-task.js`

任务完成后执行的钩子函数，用于发送飞书通知。

**功能**：
- 自动捕获任务执行结果
- 计算任务执行时间
- 构建详细的通知内容
- 发送飞书群组通知
- 支持成功和失败状态的不同处理

**使用方法**：

```javascript
const postTaskHook = require('./post-task.js');

// 任务执行完成后调用
async function executeTask() {
  const startTime = Date.now();
  
  // 执行任务
  const result = await performTask();
  
  const endTime = Date.now();
  
  // 调用钩子脚本发送通知
  await postTaskHook({
    taskName: '代码提交',
    taskId: 'task-123',
    status: 'success',
    result: {
      files: ['src/file1.js', 'src/file2.js'],
      branches: ['main', 'develop']
    },
    startTime: startTime,
    endTime: endTime
  });
}
```

## 配置要求

### 1. 环境变量配置

在项目根目录创建 `.env` 文件，配置以下环境变量：

```env
# 飞书应用配置
FEISHU_APP_ID=your_app_id_here
FEISHU_APP_SECRET=your_app_secret_here
FEISHU_TENANT_ACCESS_TOKEN=your_tenant_access_token_here
```

### 2. 依赖安装

进入 `skills/feishu-messenger` 目录，安装依赖：

```bash
npm install
```

## 测试钩子脚本

可以直接执行钩子脚本来测试通知功能：

```bash
node post-task.js
```

这将发送一条测试通知到配置的飞书群组。

## 集成到任务执行流程

要在任务执行流程中集成此钩子脚本，需要在任务执行完成后调用 `postTaskHook` 函数。

### 示例：集成到构建流程

```javascript
// build.js
const postTaskHook = require('./.trae/hooks/post-task.js');

async function build() {
  console.log('开始构建项目...');
  
  const startTime = Date.now();
  let status = 'success';
  let buildResult = {};
  
  try {
    // 执行构建操作
    buildResult = await runBuildProcess();
    console.log('构建成功！');
  } catch (error) {
    console.error('构建失败:', error.message);
    status = 'failed';
  }
  
  const endTime = Date.now();
  
  // 发送构建完成通知
  await postTaskHook({
    taskName: '项目构建',
    taskId: `build-${Date.now()}`,
    status: status,
    result: buildResult,
    startTime: startTime,
    endTime: endTime
  });
}

build().catch(console.error);
```

## 通知内容格式

飞书通知内容包含以下信息：

- 任务执行状态
- 执行时间
- 任务内容
- 提交的文件（如果有）
- 同步的分支（如果有）
- 备注信息

## 故障排除

### 1. 通知发送失败

- 检查 `.env` 文件中的飞书应用配置
- 确认 `FEISHU_TENANT_ACCESS_TOKEN` 是否有效
- 验证飞书群组ID是否正确
- 检查网络连接是否正常

### 2. 依赖问题

- 确保已安装所有必要的依赖
- 检查 Node.js 版本是否兼容

### 3. 权限问题

- 确保飞书机器人有发送消息的权限
- 确认群组已添加机器人
