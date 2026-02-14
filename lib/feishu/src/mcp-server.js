#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import FeishuMessenger from './messenger.js';

async function startServer() {
  try {
    const server = new Server(
      {
        name: 'feishu-messenger',
        version: '1.1.0',
        description: 'Feishu (Lark) bot messenger with long connection support',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    const messenger = new FeishuMessenger();
    
    // 注册飞书消息处理器
    messenger.registerMessageHandler(async (messageData) => {
      console.log('🤖 处理飞书消息并转发给 Agent...');
      try {
        const { message } = messageData;
        const { chat_id, content, msg_type, sender } = message;
        
        // 解析消息内容
        let messageText = '';
        if (msg_type === 'text') {
          const parsedContent = JSON.parse(content);
          messageText = parsedContent.text;
        }
        
        if (messageText) {
          console.log('📤 转发飞书消息给 Agent:', {
            chat_id,
            sender: sender.sender_id,
            message: messageText.substring(0, 100) + '...'
          });
          
          // 这里可以添加逻辑，将消息转发给 Agent
          // 例如通过 MCP 服务器的回调机制
        }
      } catch (error) {
        console.error('❌ 转发飞书消息失败:', error.message);
      }
    });

    console.log('Setting up tool list handler...');
    server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'send_feishu_text_message',
            description: 'Send a text message to a Feishu user or group',
            inputSchema: {
              type: 'object',
              properties: {
                receive_id: {
                  type: 'string',
                  description: 'The Open ID of the recipient',
                },
                text: {
                  type: 'string',
                  description: 'The text message to send',
                },
              },
              required: ['receive_id', 'text'],
            },
          },
          {
            name: 'send_feishu_card_message',
            description: 'Send an interactive card message to a Feishu user',
            inputSchema: {
              type: 'object',
              properties: {
                receive_id: {
                  type: 'string',
                  description: 'The Open ID of the recipient',
                },
                title: {
                  type: 'string',
                  description: 'The card title',
                },
                content: {
                  type: 'string',
                  description: 'The card content (supports Markdown)',
                },
                buttons: {
                  type: 'array',
                  description: 'Array of button objects with text, type, and url',
                  items: {
                    type: 'object',
                    properties: {
                      text: {
                        type: 'string',
                        description: 'Button text',
                      },
                      type: {
                        type: 'string',
                        description: 'Button type (primary, default, danger)',
                        enum: ['primary', 'default', 'danger'],
                      },
                      url: {
                        type: 'string',
                        description: 'Button URL',
                      },
                    },
                    required: ['text', 'url'],
                  },
                },
              },
              required: ['receive_id', 'title', 'content'],
            },
          },
          {
            name: 'send_feishu_status_card',
            description: 'Send a status card to a Feishu user',
            inputSchema: {
              type: 'object',
              properties: {
                receive_id: {
                  type: 'string',
                  description: 'The Open ID of the recipient',
                },
                title: {
                  type: 'string',
                  description: 'The card title',
                },
                status: {
                  type: 'string',
                  description: 'The status (success, warning, error, info)',
                  enum: ['success', 'warning', 'error', 'info'],
                },
                details: {
                  type: 'string',
                  description: 'The status details (supports Markdown)',
                },
              },
              required: ['receive_id', 'title', 'status', 'details'],
            },
          },
          {
            name: 'send_feishu_notification',
            description: 'Send a notification card to a Feishu user',
            inputSchema: {
              type: 'object',
              properties: {
                receive_id: {
                  type: 'string',
                  description: 'The Open ID of the recipient',
                },
                title: {
                  type: 'string',
                  description: 'The notification title',
                },
                message: {
                  type: 'string',
                  description: 'The notification message (supports Markdown)',
                },
                actions: {
                  type: 'array',
                  description: 'Array of action objects with text, type, and url',
                  items: {
                    type: 'object',
                    properties: {
                      text: {
                        type: 'string',
                        description: 'Action text',
                      },
                      type: {
                        type: 'string',
                        description: 'Action type (primary, default, danger)',
                        enum: ['primary', 'default', 'danger'],
                      },
                      url: {
                        type: 'string',
                        description: 'Action URL',
                      },
                    },
                    required: ['text', 'url'],
                  },
                },
              },
              required: ['receive_id', 'title', 'message'],
            },
          },
          {
            name: 'get_feishu_user_info',
            description: 'Get user information from Feishu',
            inputSchema: {
              type: 'object',
              properties: {
                user_id: {
                  type: 'string',
                  description: 'The user ID',
                },
              },
              required: ['user_id'],
            },
          },
          {
            name: 'get_feishu_connection_status',
            description: 'Get the status of the Feishu long connection',
            inputSchema: {
              type: 'object',
              properties: {},
            },
          },
          {
            name: 'send_task_complete_notification',
            description: 'Send a task completion notification to Feishu',
            inputSchema: {
              type: 'object',
              properties: {
                receive_id: {
                  type: 'string',
                  description: 'The Open ID or chat ID of the recipient',
                },
                task_name: {
                  type: 'string',
                  description: 'The name of the completed task',
                },
                status: {
                  type: 'string',
                  description: 'The task status (success, failed)',
                  enum: ['success', 'failed'],
                },
                execution_time: {
                  type: 'string',
                  description: 'The execution time of the task',
                },
                message: {
                  type: 'string',
                  description: 'Additional message about the task',
                },
              },
              required: ['receive_id', 'task_name', 'status'],
            },
          },
        ],
      };
    });

    console.log('Setting up tool call handler...');
    server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'send_feishu_text_message': {
            const { receive_id, text } = args;
            const result = await messenger.sendTextMessage(receive_id, text);
            if (result.success) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Text message sent successfully to ${receive_id}`,
                  },
                ],
              };
            } else {
              throw new Error(`Failed to send message: ${JSON.stringify(result.error)}`);
            }
          }

          case 'send_feishu_card_message': {
            const { receive_id, title, content, buttons } = args;
            const card = buttons
              ? messenger.createButtonCard(title, content, buttons)
              : messenger.createTextCard(title, content);
            const result = await messenger.sendInteractiveCard(receive_id, card);
            if (result.success) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Card message sent successfully to ${receive_id}`,
                  },
                ],
              };
            } else {
              throw new Error(`Failed to send card: ${JSON.stringify(result.error)}`);
            }
          }

          case 'send_feishu_status_card': {
            const { receive_id, title, status, details } = args;
            const card = messenger.createStatusCard(title, status, details);
            const result = await messenger.sendInteractiveCard(receive_id, card);
            if (result.success) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Status card sent successfully to ${receive_id}`,
                  },
                ],
              };
            } else {
              throw new Error(`Failed to send status card: ${JSON.stringify(result.error)}`);
            }
          }

          case 'send_feishu_notification': {
            const { receive_id, title, message, actions } = args;
            const card = messenger.createNotificationCard(title, message, actions || []);
            const result = await messenger.sendInteractiveCard(receive_id, card);
            if (result.success) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Notification sent successfully to ${receive_id}`,
                  },
                ],
              };
            } else {
              throw new Error(`Failed to send notification: ${JSON.stringify(result.error)}`);
            }
          }

          case 'get_feishu_user_info': {
            const { user_id } = args;
            const result = await messenger.getUserInfo(user_id);
            if (result.success) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `User info: ${JSON.stringify(result.data, null, 2)}`,
                  },
                ],
              };
            } else {
              throw new Error(`Failed to get user info: ${JSON.stringify(result.error)}`);
            }
          }

          case 'get_feishu_connection_status': {
            return {
              content: [
                {
                  type: 'text',
                  text: `Feishu connection status: ${messenger.isConnected ? '✅ Connected' : '❌ Disconnected'}`,
                },
              ],
            };
          }

          case 'send_task_complete_notification': {
            const { receive_id, task_name, status, execution_time, message } = args;
            
            const statusEmoji = status === 'success' ? '✅' : '❌';
            const statusText = status === 'success' ? '成功' : '失败';
            
            // 构建通知内容
            let notificationContent = `任务执行${statusText}\n` +
                                     `\n` +
                                     `**任务名称**: ${task_name}\n` +
                                     `**执行状态**: ${statusEmoji} ${statusText}\n`;
            
            if (execution_time) {
              notificationContent += `**执行时间**: ${execution_time}\n`;
            }
            
            if (message) {
              notificationContent += `**备注**:\n${message}\n`;
            }
            
            notificationContent += `\n**通知时间**: ${new Date().toLocaleString()}`;
            
            const result = await messenger.sendTextMessage(receive_id, notificationContent);
            if (result.success) {
              return {
                content: [
                  {
                    type: 'text',
                    text: `Task completion notification sent successfully to ${receive_id}`,
                  },
                ],
              };
            } else {
              throw new Error(`Failed to send notification: ${JSON.stringify(result.error)}`);
            }
          }

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
        };
      }
    });

    const transport = new StdioServerTransport();
    await server.connect(transport);

    // Keep the server running
    await new Promise(() => { });

  } catch (error) {
    console.error('❌ Error starting Feishu MCP server:', error);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

export { startServer };
