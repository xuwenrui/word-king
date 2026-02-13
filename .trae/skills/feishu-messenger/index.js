const axios = require('axios');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

class FeishuMessenger {
  constructor() {
    this.appId = process.env.FEISHU_APP_ID;
    this.appSecret = process.env.FEISHU_APP_SECRET;
    this.tenantAccessToken = process.env.FEISHU_TENANT_ACCESS_TOKEN;
  }

  /**
   * 获取租户访问令牌
   */
  async getTenantAccessToken() {
    if (this.tenantAccessToken) {
      return this.tenantAccessToken;
    }

    try {
      const response = await axios.post(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
        {
          app_id: this.appId,
          app_secret: this.appSecret
        }
      );

      if (response.data.code === 0) {
        this.tenantAccessToken = response.data.tenant_access_token;
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
      
      const response = await axios.post(
        'https://open.feishu.cn/open-apis/message/v4/send',
        {
          receive_id: receiveId,
          msg_type: msgType,
          content: JSON.stringify(content)
        },
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
        error: error.message
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
    return this.sendMessage(receiveId, 'interactive', { card: card });
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
module.exports = FeishuMessenger;

// 导出默认实例
const messenger = new FeishuMessenger();
module.exports.messenger = messenger;

// 导出工具函数
module.exports.sendTextMessage = async (receiveId, text) => {
  return messenger.sendTextMessage(receiveId, text);
};

module.exports.sendInteractiveCard = async (receiveId, card) => {
  return messenger.sendInteractiveCard(receiveId, card);
};

module.exports.sendTaskCompleteNotification = async (receiveId, taskResult) => {
  return messenger.sendTaskCompleteNotification(receiveId, taskResult);
};
