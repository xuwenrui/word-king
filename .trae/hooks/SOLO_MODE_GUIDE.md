# Solo模式飞书通知集成指南

## 📋 目录
1. [功能说明](#功能说明)
2. [配置要求](#配置要求)
3. [使用方法](#使用方法)
4. [集成到Solo模式](#集成到solo模式)
5. [测试方法](#测试方法)
6. [常见问题](#常见问题)

---

## 功能说明

本指南介绍如何在Solo模式下，每次任务完成后自动发送飞书通知。通过集成飞书MCP服务器和任务完成钩子脚本，可以实现以下功能：

- ✅ 自动捕获Solo模式任务执行结果
- ✅ 计算任务执行时间
- ✅ 构建详细的通知内容，包括任务状态、执行时间、任务输出等
- ✅ 自动发送飞书群组通知
- ✅ 支持成功和失败状态的不同处理

---

## 配置要求

### 1. 飞书应用配置

在项目根目录创建 `.env` 文件，配置以下环境变量：

```env
# Feishu Configuration
FEISHU_APP_ID=your_app_id_here
FEISHU_APP_SECRET=your_app_secret_here
```

### 2. 依赖安装

进入 `skills/feishu-messenger` 目录，安装依赖：

```bash
npm install
```

### 3. 飞书群组配置

确保你有一个有效的飞书群组ID，格式如 `oc_xxxxxxxxxxxxxxxx`。

如果需要修改通知发送的目标群组，编辑 `solo-task-complete.js` 文件中的 `RECEIVE_ID` 常量：

```javascript
// 飞书群组ID
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';
```

---

## 使用方法

### 1. 直接执行脚本

可以直接执行脚本发送测试通知：

```bash
node solo-task-complete.js
```

### 2. 在代码中调用

在你的Solo模式执行代码中，任务完成后调用：

```javascript
const sendSoloTaskCompleteNotification = require('./.trae/hooks/solo-task-complete.js');

async function executeTask() {
  const startTime = Date.now();
  
  // 执行任务
  let status = 'success';
  let result = {};
  let output = '';
  
  try {
    // 执行实际任务
    result = await performTask();
    output = '任务执行成功！';
  } catch (error) {
    status = 'failed';
    output = `任务执行失败：${error.message}`;
  }
  
  const endTime = Date.now();
  
  // 发送任务完成通知
  await sendSoloTaskCompleteNotification({
    taskName: '代码构建',
    taskId: `task-${Date.now()}`,
    status: status,
    result: result,
    startTime: startTime,
    endTime: endTime,
    output: output
  });
}

executeTask().catch(console.error);
```

---

## 集成到Solo模式

### 方法 1: 修改Solo模式执行器

如果Solo模式有自己的执行器，可以在执行器的任务完成回调中添加通知逻辑：

```javascript
// 在Solo模式执行器中
class SoloExecutor {
  async execute(task) {
    const startTime = Date.now();
    let status = 'success';
    let result = {};
    
    try {
      result = await this.runTask(task);
    } catch (error) {
      status = 'failed';
      result = { error: error.message };
    }
    
    const endTime = Date.now();
    
    // 发送任务完成通知
    const sendSoloTaskCompleteNotification = require('./.trae/hooks/solo-task-complete.js');
    await sendSoloTaskCompleteNotification({
      taskName: task.name,
      taskId: task.id,
      status: status,
      result: result,
      startTime: startTime,
      endTime: endTime,
      output: task.output || ''
    });
    
    return { status, result };
  }
}
```

### 方法 2: 使用环境变量触发

在Solo模式的启动命令中添加环境变量，触发通知功能：

```bash
# 在启动Solo模式时设置环境变量
SOLO_MODE_NOTIFY=true node solo-executor.js
```

然后在Solo执行器中检查此环境变量：

```javascript
if (process.env.SOLO_MODE_NOTIFY === 'true') {
  const sendSoloTaskCompleteNotification = require('./.trae/hooks/solo-task-complete.js');
  await sendSoloTaskCompleteNotification(taskContext);
}
```

### 方法 3: 使用钩子机制

如果Solo模式支持钩子机制，可以在钩子配置中添加：

```javascript
// hooks.js
module.exports = {
  postTask: [
    './.trae/hooks/solo-task-complete.js'
  ]
};
```

---

## 测试方法

### 1. 测试脚本执行

```bash
# 进入hooks目录
cd .trae/hooks

# 执行测试脚本
node solo-task-complete.js
```

### 2. 测试通知发送

```bash
# 发送测试通知
node -e "
const send = require('./solo-task-complete.js');
send({
  taskName: '测试任务',
  taskId: 'test-123',
  status: 'success',
  result: { files: ['src/file1.js'] },
  startTime: Date.now() - 3000,
  endTime: Date.now(),
  output: '测试成功！'
});
"
```

### 3. 测试失败状态

```bash
# 测试失败状态通知
node -e "
const send = require('./solo-task-complete.js');
send({
  taskName: '测试任务',
  taskId: 'test-456',
  status: 'failed',
  result: { error: '测试失败' },
  startTime: Date.now() - 2000,
  endTime: Date.now(),
  output: '测试失败：网络错误'
});
"
```

---

## 通知内容格式

发送到飞书群组的通知内容格式如下：

```
Solo模式任务执行成功

**任务名称**: 代码构建
**任务ID**: task-1234567890
**执行时间**: 5.23秒
**完成时间**: 2026-02-14 15:30:45
**执行状态**: ✅ 成功

**任务输出**:
```
构建通过
测试通过
部署完成
```

**任务结果**:
- files: [src/file1.js, src/file2.js]
- branches: [main, develop]
- buildStatus: pass
```

---

## 常见问题

### 1. 通知发送失败

**问题**: 执行脚本后，通知发送失败，显示 "获取租户访问令牌失败: invalid param"

**解决方案**:
- 检查 `.env` 文件中的 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET` 是否正确
- 确保飞书应用已发布并获得了必要的权限
- 确保网络连接正常

### 2. 环境变量未生效

**问题**: 配置了 `.env` 文件，但脚本仍然显示环境变量未配置

**解决方案**:
- 确保 `.env` 文件在项目根目录
- 检查环境变量格式是否正确
- 尝试重启终端或IDE

### 3. 群组ID无效

**问题**: 通知发送失败，显示 "receive_id is not valid"

**解决方案**:
- 确保 `RECEIVE_ID` 是有效的飞书群组ID（格式如 `oc_xxxxxxxxxxxxxxxx`）
- 确保飞书机器人已添加到目标群组
- 确保飞书应用有发送群组消息的权限

---

## 相关文件

- `solo-task-complete.js` - Solo模式任务完成通知脚本
- `post-task.js` - 通用任务完成通知脚本
- `../skills/feishu-messenger/` - 飞书通知技能
- `../../lib/feishu/` - 飞书MCP服务器

---

## 注意事项

1. **安全考虑**:
   - 不要将 `.env` 文件提交到版本控制
   - 使用环境变量或密钥管理服务存储敏感信息

2. **性能考虑**:
   - 通知发送是异步操作，不会阻塞任务执行
   - 任务执行结果会缓存，确保通知内容完整

3. **可靠性考虑**:
   - 即使通知发送失败，任务执行结果也会正常返回
   - 提供详细的错误日志，便于排查问题

---

## 联系支持

如果遇到问题：
1. 查看本文档的常见问题部分
2. 查看飞书 API 文档
3. 检查飞书应用配置和权限
4. 提交 Issue 或联系技术支持
