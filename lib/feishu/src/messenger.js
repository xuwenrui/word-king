import dotenv from 'dotenv';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

class FeishuMessenger {
  constructor(config = {}) {
    this.appId = config.appId || process.env.FEISHU_APP_ID;
    this.appSecret = config.appSecret || process.env.FEISHU_APP_SECRET;
    this.baseUrl = 'https://open.feishu.cn/open-apis';
    this.tenantAccessToken = null;
    this.tokenExpireTime = null;
  }

  async getTenantAccessToken() {
    if (this.tenantAccessToken && this.tokenExpireTime > Date.now()) {
      return this.tenantAccessToken;
    }

    try {
      const response = await axios.post(`${this.baseUrl}/auth/v3/tenant_access_token/internal`, {
        app_id: this.appId,
        app_secret: this.appSecret,
      });

      this.tenantAccessToken = response.data.tenant_access_token;
      this.tokenExpireTime = Date.now() + (response.data.expire - 60) * 1000;

      return this.tenantAccessToken;
    } catch (error) {
      throw new Error(`Failed to get tenant access token: ${error.message}`);
    }
  }

  async sendTextMessage(receiveId, text) {
    return this.sendMessage(receiveId, 'text', {
      text: text,
    });
  }

  async sendPostMessage(receiveId, title, content) {
    return this.sendMessage(receiveId, 'post', {
      post: {
        zh_cn: {
          title: title,
          content: content,
        },
      },
    });
  }

  async sendInteractiveCard(receiveId, card) {
    return this.sendMessage(receiveId, 'interactive', card);
  }

  async sendMessage(receiveId, messageType, content) {
    try {
      const token = await this.getTenantAccessToken();

      // Determine receive_id_type based on the receive_id prefix
      let receiveIdType = 'open_id'; // default
      if (receiveId.startsWith('oc_')) {
        receiveIdType = 'chat_id';
      } else if (receiveId.startsWith('ou_')) {
        receiveIdType = 'open_id';
      } else if (receiveId.startsWith('on_')) {
        receiveIdType = 'union_id';
      }

      // Build request body based on receive_id_type
      let requestBody = {
        msg_type: messageType,
        content: content,
      };

      // Add the appropriate ID field based on type
      if (receiveIdType === 'chat_id') {
        requestBody.chat_id = receiveId;
      } else if (receiveIdType === 'open_id') {
        requestBody.open_id = receiveId;
      } else if (receiveIdType === 'union_id') {
        requestBody.union_id = receiveId;
      } else {
        requestBody.user_id = receiveId;
      }

      const response = await axios.post(
        `${this.baseUrl}/message/v4/send`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  async getUserInfo(userId) {
    try {
      const token = await this.getTenantAccessToken();

      const response = await axios.get(`${this.baseUrl}/contact/v3/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  createTextCard(title, content) {
    return {
      config: {
        wide_screen_mode: true,
      },
      header: {
        title: {
          tag: 'plain_text',
          content: title,
        },
      },
      elements: [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: content,
          },
        },
      ],
    };
  }

  createButtonCard(title, content, buttons) {
    return {
      config: {
        wide_screen_mode: true,
      },
      header: {
        title: {
          tag: 'plain_text',
          content: title,
        },
      },
      elements: [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: content,
          },
        },
        {
          tag: 'action',
          actions: buttons.map(button => ({
            tag: 'button',
            text: {
              tag: 'plain_text',
              content: button.text,
            },
            type: button.type || 'default',
            url: button.url,
          })),
        },
      ],
    };
  }

  createStatusCard(title, status, details) {
    const statusEmoji = {
      success: '✅',
      warning: '⚠️',
      error: '❌',
      info: 'ℹ️',
    };

    return {
      config: {
        wide_screen_mode: true,
      },
      header: {
        title: {
          tag: 'plain_text',
          content: `${statusEmoji[status] || 'ℹ️'} ${title}`,
        },
      },
      elements: [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: details,
          },
        },
      ],
    };
  }

  createNotificationCard(title, message, actions = []) {
    return {
      config: {
        wide_screen_mode: true,
      },
      header: {
        title: {
          tag: 'plain_text',
          content: title,
        },
      },
      elements: [
        {
          tag: 'div',
          text: {
            tag: 'lark_md',
            content: message,
          },
        },
        ...(actions.length > 0
          ? [
            {
              tag: 'action',
              actions: actions.map(action => ({
                tag: 'button',
                text: {
                  tag: 'plain_text',
                  content: action.text,
                },
                type: action.type || 'default',
                url: action.url,
              })),
            },
          ]
          : []),
      ],
    };
  }
}

export default FeishuMessenger;
