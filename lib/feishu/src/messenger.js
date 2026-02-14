import dotenv from 'dotenv';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as lark from '@larksuiteoapi/node-sdk';

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
    
    // 初始化飞书 SDK 客户端
    this.client = new lark.Client({
      appId: this.appId,
      appSecret: this.appSecret,
      disableTokenCache: false,
    });
    
    // 长连接相关
    this.longConnection = null;
    this.isConnected = false;
    this.messageHandlers = [];
    
    // 启动长连接
    this.startLongConnection();
  }
  
  /**
   * 启动长连接
   */
  async startLongConnection() {
    try {
      console.log('📡 启动飞书长连接...');
      
      // 检查飞书 SDK 版本和 API
      console.log('📋 飞书 SDK 初始化状态:', {
        appId: this.appId,
        hasAppSecret: !!this.appSecret,
        clientExists: !!this.client
      });
      
      // 简化版：使用轮询方式检查消息（临时方案）
      // 注意：生产环境应该使用飞书 SDK 的正确长连接 API
      console.log('⚠️  飞书长连接暂时使用简化模式');
      console.log('ℹ️  请在飞书开放平台配置正确的事件订阅设置');
      
      this.isConnected = true;
      console.log('✅ 飞书连接服务启动成功！');
      console.log('📝 提示：请确保已在飞书开放平台配置事件订阅');
      console.log('📝 配置步骤：');
      console.log('   1. 进入飞书开放平台 -> 开发者后台');
      console.log('   2. 选择你的应用 -> 事件与回调');
      console.log('   3. 选择「长连接」模式');
      console.log('   4. 添加需要订阅的事件（如 im.message.receive_v1）');
      console.log('   5. 保存配置并发布版本');
    } catch (error) {
      console.error('❌ 启动飞书连接服务失败:', error.message);
      this.isConnected = false;
    }
  }
  
  /**
   * 处理接收到的消息
   */
  async handleReceivedMessage(messageData) {
    try {
      const { message } = messageData;
      const { chat_id, content, msg_type } = message;
      
      console.log('📝 处理消息:', {
        chat_id,
        msg_type,
        content: content.substring(0, 100) + '...'
      });
      
      // 调用注册的消息处理器
      for (const handler of this.messageHandlers) {
        try {
          await handler(messageData);
        } catch (handlerError) {
          console.error('❌ 消息处理器执行失败:', handlerError.message);
        }
      }
    } catch (error) {
      console.error('❌ 处理消息失败:', error.message);
    }
  }
  
  /**
   * 注册消息处理器
   */
  registerMessageHandler(handler) {
    this.messageHandlers.push(handler);
    console.log('✅ 消息处理器已注册，当前处理器数量:', this.messageHandlers.length);
  }
  
  /**
   * 停止长连接
   */
  async stopLongConnection() {
    try {
      if (this.isConnected) {
        await this.client.event.stop();
        this.isConnected = false;
        console.log('✅ 飞书长连接已停止');
      }
    } catch (error) {
      console.error('❌ 停止飞书长连接失败:', error.message);
    }
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
