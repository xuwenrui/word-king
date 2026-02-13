#!/usr/bin/env node

/**
 * 任务完成通知脚本
 * 
 * 这个脚本用于通知飞书任务完成，包括代码提交和分支同步。
 */

import FeishuMessenger from './src/messenger.js';

console.log('🚀 任务完成通知');
console.log('='.repeat(60));

// 创建飞书客户端实例
const messenger = new FeishuMessenger();

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 发送任务完成通知
 */
async function sendTaskCompleteNotification() {
  console.log(`\n📢 发送任务完成通知到飞书群组...`);
  console.log(`   群组ID: ${RECEIVE_ID}`);
  
  try {
    // 准备通知内容
    const message = `任务执行完成\n` +
                    `\n` +
                    `**任务内容**:\n` +
                    `1. ✅ 提交代码\n` +
                    `2. ✅ 同步飞书插件到所有分支\n` +
                    `3. ✅ 执行完通知给飞书\n` +
                    `\n` +
                    `**执行时间**: ${new Date().toLocaleString()}\n` +
                    `**执行状态**: ✅ 成功\n` +
                    `\n` +
                    `**提交的文件**:\n` +
                    `- src/messenger.js (修复卡片消息格式)\n` +
                    `- example-task-status.js (任务状态更新示例)\n` +
                    `- test-feishu-status.js (飞书状态消息测试)\n` +
                    `- test-feishu-text.js (飞书文本消息测试)\n` +
                    `- test-task-notification.js (任务通知测试)\n` +
                    `\n` +
                    `**同步的分支**:\n` +
                    `- main\n` +
                    `- feature/backend-bot\n` +
                    `- feature/frontend-bot\n` +
                    `- feature/ui-desiger-bot\n` +
                    `- feature/feishu-mcp-clean\n` +
                    `- develop\n` +
                    `\n` +
                    `**功能状态**:\n` +
                    `- ✅ API连接正常\n` +
                    `- ✅ 文本消息发送正常\n` +
                    `- ⚠️  卡片消息待修复\n` +
                    `\n` +
                    `**备注**:\n` +
                    `飞书MCP服务器已可用于发送文本消息通知，\n` +
                    `卡片消息功能需要进一步修复。`;
    
    // 发送文本消息
    console.log('\n📝 正在发送消息...');
    const sendResult = await messenger.sendTextMessage(RECEIVE_ID, message);
    
    console.log('\n📋 发送结果');
    console.log('-'.repeat(40));
    
    if (sendResult.success) {
      console.log('✅ 消息发送成功！');
      console.log(`   消息ID: ${sendResult.data.message_id || 'N/A'}`);
      console.log(`   响应代码: ${sendResult.data.code || 'N/A'}`);
      console.log(`   响应消息: ${sendResult.data.msg || 'N/A'}`);
      console.log('\n🎉 任务完成通知已发送到飞书群组！');
      
      return true;
    } else {
      console.error('❌ 消息发送失败:', sendResult.error);
      return false;
    }
    
  } catch (error) {
    console.error('❌ 发送通知时出错:', error.message);
    return false;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🎯 执行任务完成通知');
  console.log('='.repeat(60));
  
  // 发送任务完成通知
  const notificationSent = await sendTaskCompleteNotification();
  
  // 执行结果
  console.log('\n📋 最终执行结果');
  console.log('-'.repeat(40));
  
  if (notificationSent) {
    console.log('✅ 任务完成！');
    console.log('   - 代码已提交');
    console.log('   - 分支已同步');
    console.log('   - 通知已发送');
  } else {
    console.log('❌ 任务部分完成！');
    console.log('   - 代码已提交');
    console.log('   - 分支已同步');
    console.log('   - 通知发送失败');
  }
  
  console.log('\n='.repeat(60));
  console.log('🎯 所有任务执行完成！');
  console.log('='.repeat(60));
}

// 执行主函数
main().catch(console.error);
