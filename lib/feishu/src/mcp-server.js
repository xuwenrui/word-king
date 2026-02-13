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
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    const messenger = new FeishuMessenger();

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
