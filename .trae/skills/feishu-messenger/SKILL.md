---
name: "feishu-messenger"
description: "Sends messages to Feishu (Lark) bot via API. Invoke when user asks to send messages to Feishu/Lark bot or notify team members."
---

# Feishu Messenger

This skill enables sending messages to Feishu (Lark) bots through the Feishu API. It supports various message types including text, rich text, and interactive cards.

## Prerequisites

Before using this skill, you need:

1. **Feishu Bot Credentials**
   - App ID (App ID)
   - App Secret (App Secret)
   - Bot Webhook URL (optional, for receiving messages)

2. **Tenant Access Token**
   - Generated from App ID and App Secret
   - Required for API authentication

3. **Open ID or User ID**
   - Target recipient's Open ID or User ID
   - Can be obtained from Feishu API or user profile

## Configuration

Create a `.env` file in your project root:

```env
FEISHU_APP_ID=your_app_id_here
FEISHU_APP_SECRET=your_app_secret_here
FEISHU_TENANT_ACCESS_TOKEN=your_tenant_access_token_here
FEISHU_BOT_WEBHOOK=your_bot_webhook_url_here
```

## Usage

### Send Text Message

Send a simple text message to a user or group:

```javascript
await sendTextMessage({
  receive_id: "ou_xxxxxxxxxxxxxxxx",  // Open ID of recipient
  msg_type: "text",
  content: {
    text: "Hello from Trae!"
  }
});
```

### Send Rich Text Message

Send a rich text message with formatting:

```javascript
await sendRichTextMessage({
  receive_id: "ou_xxxxxxxxxxxxxxxx",
  msg_type: "interactive",
  card: {
    header: {
      title: {
        tag: "plain_text",
        content: "Project Update"
      }
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: "**Status**: Complete\n**Time**: 2026-02-14"
        }
      }
    ]
  }
});
```

### Send Card Message

Send an interactive card with buttons:

```javascript
await sendCardMessage({
  receive_id: "ou_xxxxxxxxxxxxxxxx",
  msg_type: "interactive",
  card: {
    config: {
      wide_screen_mode: true
    },
    header: {
      title: {
        tag: "plain_text",
        content: "Task Notification"
      }
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: "A new task has been assigned to you."
        }
      },
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: {
              tag: "plain_text",
              content: "View Details"
            },
            type: "primary",
            url: "https://example.com/task/123"
          }
        ]
      }
    ]
  }
});
```

### Send to Multiple Recipients

Send the same message to multiple users:

```javascript
const recipients = [
  "ou_xxxxxxxxxxxxxxxx",
  "ou_yyyyyyyyyyyyyyyy",
  "ou_zzzzzzzzzzzzzzz"
];

for (const recipient of recipients) {
  await sendTextMessage({
    receive_id: recipient,
    msg_type: "text",
    content: {
      text: "Team update notification"
    }
  });
}
```

## Message Types

### 1. Text Message

Simple plain text message.

```javascript
{
  msg_type: "text",
  content: {
    text: "Your message here"
  }
}
```

### 2. Post Message

Rich text post with images and attachments.

```javascript
{
  msg_type: "post",
  content: {
    post: {
      zh_cn: {
        title: "Post Title",
        content: [
          [
            {
              tag: "text",
              text: "Post content here"
            }
          ]
        ]
      }
    }
  }
}
```

### 3. Interactive Card

Interactive card with buttons and actions.

```javascript
{
  msg_type: "interactive",
  card: {
    header: {
      title: {
        tag: "plain_text",
        content: "Card Title"
      }
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: "**Bold text** and *italic text*"
        }
      },
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: {
              tag: "plain_text",
              content: "Button Text"
            },
            type: "primary",
            url: "https://example.com"
          }
        ]
      }
    ]
  }
}
```

## API Methods

### Get Tenant Access Token

```javascript
async function getTenantAccessToken() {
  const response = await axios.post(
    'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    {
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET
    }
  );
  return response.data.tenant_access_token;
}
```

### Send Message

```javascript
async function sendMessage(receiveId, messageType, content) {
  const token = await getTenantAccessToken();
  
  const response = await axios.post(
    'https://open.feishu.cn/open-apis/message/v4/send',
    {
      receive_id: receiveId,
      msg_type: messageType,
      content: content
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
}
```

### Get User Info

```javascript
async function getUserInfo(userId) {
  const token = await getTenantAccessToken();
  
  const response = await axios.get(
    `https://open.feishu.cn/open-apis/contact/v3/users/${userId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );
  
  return response.data;
}
```

## Error Handling

Common errors and solutions:

### 1. Invalid Access Token

```javascript
{
  "code": 99991663,
  "msg": "access_token invalid"
}
```

**Solution**: Refresh tenant access token.

### 2. Invalid Receive ID

```javascript
{
  "code": 1003,
  "msg": "receive_id is not valid"
}
```

**Solution**: Verify the recipient's Open ID or User ID.

### 3. Rate Limit Exceeded

```javascript
{
  "code": 99991401,
  "msg": "rate limit exceeded"
}
```

**Solution**: Implement retry logic with exponential backoff.

## Best Practices

1. **Token Management**
   - Cache tenant access token
   - Refresh before expiration
   - Handle token refresh errors

2. **Message Formatting**
   - Use Markdown for rich text
   - Keep messages concise
   - Test card layouts

3. **Error Handling**
   - Implement retry logic
   - Log errors for debugging
   - Provide user-friendly error messages

4. **Rate Limiting**
   - Respect API rate limits
   - Implement queuing for bulk messages
   - Use batch operations when available

## Examples

### Example 1: Project Notification

```javascript
await sendCardMessage({
  receive_id: "ou_xxxxxxxxxxxxxxxx",
  msg_type: "interactive",
  card: {
    header: {
      title: {
        tag: "plain_text",
        content: "🎉 Project Deployed"
      }
    },
    elements: [
      {
        tag: "div",
        text: {
          tag: "lark_md",
          content: "**Project**: Word King\n**Environment**: Production\n**Status**: ✅ Success"
        }
      },
      {
        tag: "action",
        actions: [
          {
            tag: "button",
            text: {
              tag: "plain_text",
              content: "View Dashboard"
            },
            type: "primary",
            url: "https://dashboard.example.com"
          }
        ]
      }
    ]
  }
});
```

### Example 2: Code Review Notification

```javascript
await sendTextMessage({
  receive_id: "ou_xxxxxxxxxxxxxxxx",
  msg_type: "text",
  content: {
    text: "📝 Code Review Request\n\nPR #123: Add new feature\nAuthor: @john\n\nPlease review at your earliest convenience."
  }
});
```

### Example 3: Build Status Update

```javascript
await sendRichTextMessage({
  receive_id: "ou_xxxxxxxxxxxxxxxx",
  msg_type: "post",
  content: {
    post: {
      zh_cn: {
        title: "🚀 Build Complete",
        content: [
          [
            {
              tag: "text",
              text: "Build #456 completed successfully"
            },
            {
              tag: "at",
              user_id: "ou_yyyyyyyyyyyyyyyy",
              text: {
                tag: "plain_text",
                content: "@john"
              }
            }
          }
        ]
      }
    }
  }
});
```

## Troubleshooting

### Issue: Token Expired

**Error**: `access_token expired`

**Solution**: Implement automatic token refresh before expiration.

### Issue: Message Not Delivered

**Error**: Message sent but not received

**Solution**:
- Check recipient's notification settings
- Verify bot has permission to send messages
- Check if recipient has blocked the bot

### Issue: Card Not Rendering

**Error**: Card shows as raw JSON

**Solution**:
- Verify card structure is correct
- Check for syntax errors in JSON
- Test with simpler card structure

## Security Considerations

1. **Credential Management**
   - Store credentials in environment variables
   - Never commit `.env` to version control
   - Use secret management services in production

2. **API Security**
   - Use HTTPS for all API calls
   - Validate all input parameters
   - Implement rate limiting

3. **Data Privacy**
   - Don't log sensitive message content
   - Comply with data protection regulations
   - Obtain user consent for notifications

## Resources

- [Feishu Open API Documentation](https://open.feishu.cn/document/)
- [Feishu Bot Development Guide](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjN5UjN5j)
- [Feishu API Console](https://open.feishu.cn/app)
- [Message Types Reference](https://open.feishu.cn/document/ukTMukTMukTM/uEjNwUjN5UjN5j)

## License

MIT License - See project LICENSE file for details.

## Support

For issues and questions:
- Check Feishu API documentation
- Open an issue on GitHub
- Contact Feishu support
