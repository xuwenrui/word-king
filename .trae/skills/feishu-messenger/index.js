import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 加载环境变量 - 从lib/feishu/.env加载，与能正常工作的版本保持一致
dotenv.config({ path: join(__dirname, '..', '..', '..', 'lib', 'feishu', '.env') });

class FeishuMessenger {
  constructor() {
    this.appId = process.env.FEISHU_APP_ID;
    this.appSecret = process.env.FEISHU_APP_SECRET;
    this.baseUrl = 'https://open.feishu.cn/open-apis';
    this.tenantAccessToken = null;
    this.tokenExpireTime = null;
  }

  /**
   * 获取租户访问令牌
   */
  async getTenantAccessToken() {
    if (this.tenantAccessToken && this.tokenExpireTime > Date.now()) {
      return this.tenantAccessToken;
    }

    try {
      const response = await axios.post(`${this.baseUrl}/auth/v3/tenant_access_token/internal`, {
        app_id: this.appId,
        app_secret: this.appSecret
      });

      if (response.data.code === 0) {
        this.tenantAccessToken = response.data.tenant_access_token;
        this.tokenExpireTime = Date.now() + (response.data.expire - 60) * 1000;
        return this.tenantAccessToken;
      } else {
        throw new Error(`获取租户访问令牌失败: ${response.data.msg}`);
      }
    } catch (error) {
      console.error('获取租户访问令牌错误:', error);
      throw error;
    }
  }

  /**
   * 发送消息
   * @param {string} receiveId - 接收者ID
   * @param {string} msgType - 消息类型
   * @param {object} content - 消息内容
   */
  async sendMessage(receiveId, msgType, content) {
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
        msg_type: msgType,
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.code === 0) {
        return {
          success: true,
          data: response.data.data
        };
      } else {
        return {
          success: false,
          error: response.data
        };
      }
    } catch (error) {
      console.error('发送消息错误:', error);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * 发送文本消息
   * @param {string} receiveId - 接收者ID
   * @param {string} text - 文本内容
   */
  async sendTextMessage(receiveId, text) {
    const content = {
      text: text
    };
    return this.sendMessage(receiveId, 'text', content);
  }

  /**
   * 发送交互式卡片消息
   * @param {string} receiveId - 接收者ID
   * @param {object} card - 卡片内容
   */
  async sendInteractiveCard(receiveId, card) {
    return this.sendMessage(receiveId, 'interactive', card);
  }

  /**
   * 发送任务完成通知
   * @param {string} receiveId - 接收者ID
   * @param {object} taskResult - 任务执行结果
   */
  async sendTaskCompleteNotification(receiveId, taskResult = {}) {
    const { 
      tasks = [], 
      files = [], 
      branches = [], 
      status = 'success',
      message = ''
    } = taskResult;

    const statusEmoji = status === 'success' ? '✅' : '❌';
    const statusText = status === 'success' ? '成功' : '失败';

    // 构建通知内容
    let notificationContent = `任务执行${statusText}\n` +
                             `\n` +
                             `**执行时间**: ${new Date().toLocaleString()}\n` +
                             `**执行状态**: ${statusEmoji} ${statusText}\n`;

    if (message) {
      notificationContent += `\n**备注**:\n${message}\n`;
    }

    if (tasks.length > 0) {
      notificationContent += `\n**任务内容**:\n`;
      tasks.forEach((task, index) => {
        const taskStatus = task.status === 'completed' ? '✅' : '⏳';
        notificationContent += `${index + 1}. ${taskStatus} ${task.name}\n`;
      });
    }

    if (files.length > 0) {
      notificationContent += `\n**提交的文件**:\n`;
      files.forEach(file => {
        notificationContent += `- ${file}\n`;
      });
    }

    if (branches.length > 0) {
      notificationContent += `\n**同步的分支**:\n`;
      branches.forEach(branch => {
        notificationContent += `- ${branch}\n`;
      });
    }

    return this.sendTextMessage(receiveId, notificationContent);
  }
}

// 导出飞书消息发送器模块
export default FeishuMessenger;

// 导出默认实例
const messenger = new FeishuMessenger();
export { messenger };

// 导出工具函数
export const sendTextMessage = async (receiveId, text) => {
  return messenger.sendTextMessage(receiveId, text);
};

export const sendInteractiveCard = async (receiveId, card) => {
  return messenger.sendInteractiveCard(receiveId, card);
};

export const sendTaskCompleteNotification = async (receiveId, taskResult) => {
  return messenger.sendTaskCompleteNotification(receiveId, taskResult);
};
