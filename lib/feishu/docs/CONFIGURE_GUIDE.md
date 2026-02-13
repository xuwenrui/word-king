# 飞书 MCP 配置指南

## 📋 当前状态

✅ **环境变量加载**: 正常
⚠️ **凭证状态**: 使用测试值

## 🔧 如何配置真实的飞书凭证

### 方法 1: 编辑 .env 文件（推荐）

1. 打开文件：`lib/feishu/.env`

2. 替换测试值为你的真实凭证：

```env
# Feishu Configuration
FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. 保存文件

### 方法 2: 使用系统环境变量

在 PowerShell 中设置：

```powershell
$env:FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
$env:FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**注意**: 这种方式只在当前 PowerShell 会话中有效。

### 方法 3: 在项目根目录创建 .env 文件

在项目根目录 `d:\developer\code\example\26\01\word-king` 创建 `.env` 文件：

```env
FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 📝 获取飞书凭证

### 步骤 1: 创建飞书应用

1. 访问：https://open.feishu.cn/app
2. 点击"创建企业自建应用"
3. 填写应用信息：
   - 应用名称：例如 "Trae Messenger"
   - 应用描述：例如 "用于 Trae IDE 发送飞书消息"
4. 点击"确定"创建应用

### 步骤 2: 获取凭证

1. 在应用页面，找到"凭证与基础信息"标签
2. 记录以下信息：
   - **App ID**: 格式如 `cli_xxxxxxxxxxxxxxxx`
   - **App Secret**: 格式如 `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 步骤 3: 配置权限

1. 在应用页面，找到"权限管理"标签
2. 添加以下权限：
   - `im:message` - 发送消息权限
   - `im:message:group_at_msg` - 群组消息权限（可选）
   - `contact:user.base:readonly` - 读取用户信息权限（可选）
3. 点击"申请权限"，等待管理员审批

### 步骤 4: 发布应用

1. 在应用页面，找到"版本管理与发布"标签
2. 点击"创建版本"
3. 填写版本信息：
   - 版本号：例如 `1.0.0`
   - 更新日志：例如 "初始版本"
4. 点击"确定"创建版本
5. 点击"发布"，选择发布范围
6. 等待发布完成

## 🧪 测试配置

### 1. 检查配置

运行检查脚本：

```bash
cd lib/feishu
node check-env.js
```

**预期输出**:
```
✅ Feishu credentials are configured!
```

### 2. 测试获取 Token

运行配置测试：

```bash
cd lib/feishu
node test-config.js
```

**预期输出**:
```
✓ Token obtained successfully
  Token: cli_xxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxx...
  Token Length: 123 characters
```

### 3. 发送测试消息（可选）

在 `test-config.js` 中取消注释以下代码：

```javascript
const receiveId = "ou_xxxxxxxxxxxxxxxx";
const result = await messenger.sendTextMessage(receiveId, "Test message from Feishu Messenger");
console.log(result);
```

然后重新运行测试。

## 📊 配置验证

### 检查清单

- [ ] 已创建飞书应用
- [ ] 已获取 App ID 和 App Secret
- [ ] 已配置应用权限（im:message）
- [ ] 已发布应用
- [ ] 已在 .env 文件中配置凭证
- [ ] 已运行 check-env.js 验证配置
- [ ] 已运行 test-config.js 测试连接
- [ ] 已成功发送测试消息

## ❓ 常见问题

### Q1: 如何获取接收者的 Open ID？

**方法 1: 通过飞书 API**
```javascript
const messenger = new FeishuMessenger();
const result = await messenger.getUserInfo('user_xxxxxxxxxxxxxxxx');
console.log(result.data.user.open_id);
```

**方法 2: 在飞书中查看**
- 打开飞书
- 点击用户头像
- 查看 Open ID（需要管理员权限）

**方法 3: 通过飞书机器人**
- 创建一个飞书机器人
- 让用户向机器人发送消息
- 从消息中获取 Open ID

### Q2: 提示 "access_token expired"

**原因**: Token 已过期

**解决**: 系统会自动刷新 token，如果仍然失败，请检查 App ID 和 App Secret 是否正确。

### Q3: 提示 "permission denied"

**原因**: 应用权限不足

**解决**:
1. 检查应用权限配置
2. 确认已申请 `im:message` 权限
3. 等待管理员审批

### Q4: 消息发送成功但未收到

**可能原因**:
1. 接收者已禁用机器人消息
2. 机器人被接收者拉黑
3. 网络延迟

**解决**:
1. 检查接收者的通知设置
2. 确认机器人未被拉黑
3. 等待几分钟后重试

## 🚀 下一步

配置完成后，你可以在 Trae 中直接发送飞书消息：

### 示例 1: 发送文本消息

```
请给用户 ou_xxxxxxxxxxxxxxxx 发送一条消息："你好，这是来自 Trae 的消息"
```

### 示例 2: 发送状态卡片

```
给用户 ou_xxxxxxxxxxxxxxxx 发送一个成功状态卡片，标题是"部署完成"，详情是"项目已成功部署到生产环境"
```

### 示例 3: 发送通知

```
给用户 ou_xxxxxxxxxxxxxxxx 发送一个通知，标题是"代码审查请求"，消息是"PR #123 需要你的审查"，包含一个按钮"查看详情"，链接到"https://github.com/repo/pull/123"
```

## 📚 相关资源

- [飞书开放平台](https://open.feishu.cn/)
- [飞书 API 文档](https://open.feishu.cn/document/)
- [飞书机器人开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjN5UjN5j)
- [lib/feishu/README.md](lib/feishu/README.md) - 详细文档
- [lib/feishu/SETUP_GUIDE.md](lib/feishu/SETUP_GUIDE.md) - 配置指南

## ✅ 总结

1. ✅ 环境变量加载正常
2. ⚠️ 需要配置真实的飞书凭证
3. 📝 编辑 `lib/feishu/.env` 文件
4. 🧪 运行 `node check-env.js` 验证
5. 🧪 运行 `node test-config.js` 测试
6. 🚀 在 Trae 中使用

配置完成后，你就可以在 Trae 中直接发送飞书消息了！🎉
