# 飞书MCP服务器

飞书（Lark）消息发送MCP服务器，用于在Trae中发送飞书消息。

## 📁 项目结构

```
lib/feishu/
├── src/                    # 源代码
│   ├── messenger.js         # 飞书API客户端
│   └── mcp-server.js       # MCP服务器
├── tests/                  # 测试文件
│   ├── test-config.js      # 测试飞书客户端配置
│   └── test-send-message.js # 测试消息发送
├── docs/                   # 文档
│   ├── README.md           # 项目说明
│   ├── SETUP_GUIDE.md      # 配置指南
│   └── CONFIGURE_GUIDE.md  # 详细配置指南
├── .env.example           # 环境变量示例
├── index.js              # 入口文件
├── package.json          # 依赖配置
└── README.md            # 本文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd lib/feishu
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并填入你的飞书凭证：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
FEISHU_APP_ID=cli_a90b81cf4038dcb5
FEISHU_APP_SECRET=Ngd3d093wn3Dd9CCZDxrjhGDhxm130z6
```

### 3. 启动MCP服务器

```bash
npm start
```

### 4. 测试

```bash
npm test
```

## 📋 功能特性

### 支持的消息类型

- **文本消息** - 发送纯文本消息
- **卡片消息** - 发送交互式卡片（支持按钮）
- **状态卡片** - 发送状态更新卡片（成功/警告/错误/信息）
- **通知卡片** - 发送通知卡片（支持操作按钮）
- **富文本消息** - 发送格式化的富文本

### 支持的接收者类型

- **用户Open ID** (`ou_` 开头) - 发送给个人用户
- **群组ID** (`oc_` 开头) - 发送给群组
- **用户Union ID** (`on_` 开头) - 发送给个人用户

### MCP工具

1. `send_feishu_text_message` - 发送文本消息
2. `send_feishu_card_message` - 发送卡片消息
3. `send_feishu_status_card` - 发送状态卡片
4. `send_feishu_notification` - 发送通知卡片
5. `get_feishu_user_info` - 获取用户信息

## 📖 使用示例

### 发送文本消息

```javascript
{
  "tool": "send_feishu_text_message",
  "params": {
    "receive_id": "oc_800bf2ea6f68216ca816fd64d8d6d906",
    "text": "Hello from Feishu MCP!"
  }
}
```

### 发送卡片消息

```javascript
{
  "tool": "send_feishu_card_message",
  "params": {
    "receive_id": "ou_xxxxxxxxxxxxxxxx",
    "title": "项目更新",
    "content": "**状态**: 完成\n**时间**: 2026-02-14",
    "buttons": [
      {
        "text": "查看详情",
        "type": "primary",
        "url": "https://example.com"
      }
    ]
  }
}
```

### 发送状态卡片

```javascript
{
  "tool": "send_feishu_status_card",
  "params": {
    "receive_id": "ou_xxxxxxxxxxxxxxxx",
    "title": "部署状态",
    "status": "success",
    "details": "项目已成功部署到生产环境"
  }
}
```

## 🧪 测试

### 运行所有测试

```bash
npm test
```

### 运行特定测试

```bash
# 测试飞书客户端
npm run test:messenger

# 测试消息发送
npm run test:send
```

## 📚 文档

- [项目说明](docs/README.md) - 详细的项目文档
- [配置指南](docs/SETUP_GUIDE.md) - 配置步骤
- [API文档](docs/CONFIGURE_GUIDE.md) - API使用说明

## 🔧 开发

### 添加新的消息类型

1. 在 `src/messenger.js` 中添加新的消息方法
2. 在 `src/mcp-server.js` 中添加对应的MCP工具
3. 更新文档

### 调试

```bash
# 启用调试日志
DEBUG=* npm start
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交问题和拉取请求！

## 📞 支持

如有问题，请：
1. 查看 [文档](docs/)
2. 提交 [Issue](https://github.com/your-repo/issues)
3. 联系飞书支持
