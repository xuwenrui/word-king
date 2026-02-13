#!/usr/bin/env node

import FeishuMessenger from '../src/messenger.js';

console.log('Testing Feishu message sending...');

async function testSendMessage() {
  try {
    const messenger = new FeishuMessenger();

    console.log('1. Getting tenant access token...');
    const token = await messenger.getTenantAccessToken();
    console.log('✅ Token obtained:', token.slice(0, 20) + '...');

    console.log('\n2. Sending test message to group oc_800bf2ea6f68216ca816fd64d8d6d906...');
    const result = await messenger.sendMessage(
      'oc_800bf2ea6f68216ca816fd64d8d6d906',
      'text',
      {
        text: '🎉 测试消息！\n\n这是来自Trae AI的飞书MCP服务器的测试消息。\n\n✅ 服务器已成功启动并运行！'
      }
    );

    if (result.success) {
      console.log('✅ 消息发送成功！');
      console.log('响应数据:', JSON.stringify(result.data, null, 2));
    } else {
      console.log('❌ 消息发送失败！');
      console.log('错误信息:', JSON.stringify(result.error, null, 2));
    }

  } catch (error) {
    console.error('❌ 发送消息时出错:', error.message);
    console.error('错误堆栈:', error.stack);
  }
}

testSendMessage();
