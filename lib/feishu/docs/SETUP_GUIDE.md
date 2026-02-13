# 飞书消息发送配置和测试指南

## 📋 目录
1. [获取飞书 App ID 和 App Secret](#获取飞书-app-id-和-app-secret)
2. [配置环境变量](#配置环境变量)
3. [测试飞书消息发送](#测试飞书消息发送)
4. [常见问题](#常见问题)

---

## 获取飞书 App ID 和 App Secret

### 步骤 1: 访问飞书开放平台

1. 打开浏览器，访问：https://open.feishu.cn/app
2. 使用飞书账号登录

### 步骤 2: 创建应用

1. 点击 **"创建企业自建应用"** 按钮
2. 填写应用信息：
   - **应用名称**: 例如 "Trae Messenger"
   - **应用描述**: 例如 "用于 Trae IDE 发送飞书消息"
3. 点击 **"确定"** 创建应用

### 步骤 3: 获取凭证

1. 在应用页面，找到 **"凭证与基础信息"** 标签
2. 记录以下信息：
   - **App ID**: 格式如 `cli_xxxxxxxxxxxxxxxx`
   - **App Secret**: 格式如 `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 步骤 4: 配置应用权限

1. 在应用页面，找到 **"权限管理"** 标签
2. 添加以下权限：
   - `im:message` - 发送消息权限
   - `im:message:group_at_msg` - 群组消息权限（可选）
   - `contact:user.base:readonly` - 读取用户信息权限（可选）

3. 点击 **"申请权限"**，等待管理员审批

### 步骤 5: 发布应用

1. 在应用页面，找到 **"版本管理与发布"** 标签
2. 点击 **"创建版本"**
3. 填写版本信息：
   - **版本号**: 例如 `1.0.0`
   - **更新日志**: 例如 "初始版本"
4. 点击 **"确定"** 创建版本
5. 点击 **"发布"**，选择发布范围
6. 等待发布完成

---

## 配置环境变量

### 方法 1: 在项目根目录创建 .env 文件（推荐）

1. 在项目根目录 `d:\developer\code\example\26\01\word-king` 创建 `.env` 文件

2. 复制以下内容到 `.env` 文件：

```env
# Feishu Configuration
FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. 将 `cli_xxxxxxxxxxxxxxxx` 替换为你的 **App ID**
4. 将 `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 替换为你的 **App Secret**

**示例**:
```env
# Feishu Configuration
FEISHU_APP_ID=cli_a1b2c3d4e5f6g7h8
FEISHU_APP_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz123456
```

### 方法 2: 在 lib/feishu 目录创建 .env 文件

1. 在 `lib/feishu` 目录创建 `.env` 文件

2. 添加以下内容：

```env
FEISHU_APP_ID=cli_xxxxxxxxxxxxxxxx
FEISHU_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 方法 3: 设置系统环境变量

在 PowerShell 中设置环境变量：

```powershell
$env:FEISHU_APP_ID="cli_xxxxxxxxxxxxxxxx"
$env:FEISHU_APP_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

**注意**: 这种方式只在当前 PowerShell 会话中有效，关闭终端后失效。

---

## 测试飞书消息发送

### 步骤 1: 安装依赖

```bash
cd lib/feishu
npm install
```

### 步骤 2: 运行测试脚本

```bash
cd lib/feishu
node test.js
```

### 步骤 3: 查看测试结果

测试脚本会执行以下操作：

1. ✅ 检查配置是否正确
2. ✅ 获取 Tenant Access Token
3. ✅ 创建各种类型的卡片
4. ✅ 显示卡片内容（不发送）

**预期输出**:
```
============================================================
Testing Feishu Messenger
============================================================

Configuration:
  App ID: ***a1b2c3d4
  App Secret: ***123456

Test 1: Get Tenant Access Token...
✓ Token obtained successfully
  Token: cli_xxxxxxxxxxxxxxxx_xxxxxxxxxxxxxxxx...

Test 2: Create Text Card...
✓ Text card created
{
  "config": {
    "wide_screen_mode": true
  },
  ...
}

Test 3: Create Button Card...
✓ Button card created
{
  "config": {
    "wide_screen_mode": true
  },
  ...
}

Test 4: Create Status Card...
✓ Status card created
{
  "config": {
    "wide_screen_mode": true
  },
  ...
}

Test 5: Create Notification Card...
✓ Notification card created
{
  "config": {
    "wide_screen_mode": true
  },
  ...
}

Test 6: Send Test Message (Optional)...
To send an actual message, uncomment the code below and set a valid receive_id:

============================================================
All Tests Passed!
============================================================

Next Steps:
1. Configure FEISHU_APP_ID and FEISHU_APP_SECRET
2. Get a valid receive_id (Open ID) from Feishu
3. Uncomment test message code to send actual messages
4. Use to MCP server in Trae to send messages
```

### 步骤 4: 发送实际消息（可选）

要发送实际消息，需要：

1. **获取接收者的 Open ID**

   方法 1: 通过飞书 API 获取
   ```javascript
   const messenger = new FeishuMessenger();
   const result = await messenger.getUserInfo('user_id_here');
   console.log(result.data.user.open_id);
   ```

   方法 2: 在飞书中查看用户信息
   - 打开飞书
   - 点击用户头像
   - 查看 Open ID（需要管理员权限）

2. **修改 test.js 发送消息**

   在 `lib/feishu/test.js` 中，取消注释以下代码：

   ```javascript
   const receiveId = "ou_xxxxxxxxxxxxxxxx";
   const result = await messenger.sendTextMessage(receiveId, "Test message from Feishu Messenger");
   console.log(result);
   ```

3. **重新运行测试**

   ```bash
   cd lib/feishu
   node test.js
   ```

4. **检查飞书消息**

   - 打开飞书
   - 查看是否收到测试消息

---

## 常见问题

### Q1: 提示 "FEISHU_APP_ID and FEISHU_APP_SECRET must be configured"

**原因**: 环境变量未配置

**解决**:
1. 检查 `.env` 文件是否在正确的位置
2. 确认 `.env` 文件内容格式正确
3. 确认没有多余的空格或引号

### Q2: 提示 "Failed to get tenant access token"

**原因**: App ID 或 App Secret 错误

**解决**:
1. 重新检查 App ID 和 App Secret
2. 确认应用已发布
3. 确认应用权限已配置

### Q3: 提示 "receive_id is not valid"

**原因**: 接收者 ID 格式错误

**解决**:
1. 确认使用的是 Open ID（格式：`ou_xxxxxxxxxxxxxxxx`）
2. 不是 User ID（格式：`user_xxxxxxxxxxxxxxxx`）
3. 确认接收者已添加到飞书

### Q4: 提示 "permission denied"

**原因**: 应用权限不足

**解决**:
1. 检查应用权限配置
2. 确认已申请 `im:message` 权限
3. 等待管理员审批

### Q5: 消息发送成功但未收到

**可能原因**:
1. 接收者已禁用机器人消息
2. 机器人被接收者拉黑
3. 网络延迟

**解决**:
1. 检查接收者的通知设置
2. 确认机器人未被拉黑
3. 等待几分钟后重试

### Q6: 如何获取用户的 Open ID？

**方法 1: 通过飞书 API**
```javascript
const messenger = new FeishuMessenger();
const result = await messenger.getUserInfo('user_xxxxxxxxxxxxxxxx');
console.log(result.data.user.open_id);
```

**方法 2: 在飞书管理后台**
1. 访问飞书管理后台
2. 进入"通讯录"
3. 选择用户
4. 查看 Open ID（需要管理员权限）

**方法 3: 通过飞书机器人**
1. 创建一个飞书机器人
2. 让用户向机器人发送消息
3. 从消息中获取 Open ID

---

## 完整示例

### 示例 1: 发送文本消息

```javascript
const FeishuMessenger = require('./lib/feishu/messenger.js');

async function sendTextMessage() {
  const messenger = new FeishuMessenger();

  const receiveId = 'ou_xxxxxxxxxxxxxxxx';
  const text = '你好，这是来自 Trae 的测试消息！';

  const result = await messenger.sendTextMessage(receiveId, text);

  if (result.success) {
    console.log('消息发送成功！');
  } else {
    console.error('消息发送失败：', result.error);
  }
}

sendTextMessage();
```

### 示例 2: 发送状态卡片

```javascript
const FeishuMessenger = require('./lib/feishu/messenger.js');

async function sendStatusCard() {
  const messenger = new FeishuMessenger();

  const receiveId = 'ou_xxxxxxxxxxxxxxxx';
  const card = messenger.createStatusCard(
    '部署完成',
    'success',
    '**项目**: Word King\n**环境**: Production\n**状态**: ✅ 成功\n**时间**: 2026-02-14 14:30'
  );

  const result = await messenger.sendInteractiveCard(receiveId, card);

  if (result.success) {
    console.log('状态卡片发送成功！');
  } else {
    console.error('状态卡片发送失败：', result.error);
  }
}

sendStatusCard();
```

### 示例 3: 发送带按钮的通知

```javascript
const FeishuMessenger = require('./lib/feishu/messenger.js');

async function sendNotification() {
  const messenger = new FeishuMessenger();

  const receiveId = 'ou_xxxxxxxxxxxxxxxx';
  const card = messenger.createNotificationCard(
    '代码审查请求',
    'PR #123: 添加新功能\n\n作者: @john\n\n请尽快审查',
    [
      {
        text: '查看 PR',
        type: 'primary',
        url: 'https://github.com/repo/pull/123',
      },
      {
        text: '稍后提醒',
        type: 'default',
        url: 'https://example.com/remind',
      },
    ]
  );

  const result = await messenger.sendInteractiveCard(receiveId, card);

  if (result.success) {
    console.log('通知发送成功！');
  } else {
    console.error('通知发送失败：', result.error);
  }
}

sendNotification();
```

---

## 在 Trae 中使用

配置完成后，可以在 Trae 中直接调用飞书消息发送功能：

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

---

## 安全建议

1. **不要提交 .env 文件到版本控制**
   - `.env` 文件包含敏感信息
   - 已添加到 `.gitignore`

2. **使用环境变量**
   - 不要在代码中硬编码凭证
   - 使用环境变量或配置文件

3. **定期更换密钥**
   - 定期更换 App Secret
   - 使用强密码

4. **最小权限原则**
   - 只申请必要的权限
   - 不要过度授权

---

## 相关资源

- [飞书开放平台](https://open.feishu.cn/)
- [飞书 API 文档](https://open.feishu.cn/document/)
- [飞书机器人开发指南](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjN5UjN5j)
- [lib/feishu/README.md](lib/feishu/README.md) - 详细文档

---

## 联系支持

如果遇到问题：
1. 查看本文档的常见问题部分
2. 查看飞书 API 文档
3. 提交 Issue 或联系技术支持
