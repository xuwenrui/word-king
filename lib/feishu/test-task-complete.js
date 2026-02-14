#!/usr/bin/env node

/**
 * 测试任务完成通知
 * 
 * 这个脚本用于测试新添加的任务完成通知功能
 */

import FeishuMessenger from './src/messenger.js';

console.log('🚀 测试任务完成通知');
console.log('='.repeat(60));

// 创建飞书客户端实例
const messenger = new FeishuMessenger();

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 测试任务完成通知
 */
async function testTaskCompleteNotification() {
  console.log(`\n📢 测试发送任务完成通知到飞书群组...`);
  console.log(`   群组ID: ${RECEIVE_ID}`);
  
  try {
    // 构建任务完成通知内容
    const taskName = '测试任务';
    const status = 'success';
    const executionTime = '10.5秒';
    const message = '这是一条测试消息，用于验证任务完成通知功能是否正常工作。';
    
    const statusEmoji = status === 'success' ? '✅' : '❌';
    const statusText = status === 'success' ? '成功' : '失败';
    
    // 构建通知内容
    let notificationContent = `任务执行${statusText}\n` +
                             `\n` +
                             `**任务名称**: ${taskName}\n` +
                             `**执行状态**: ${statusEmoji} ${statusText}\n` +
                             `**执行时间**: ${executionTime}\n` +
                             `**备注**:\n${message}\n` +
                             `\n**通知时间**: ${new Date().toLocaleString()}`;
    
    console.log('\n📝 测试发送任务完成通知...');
    const sendResult = await messenger.sendTextMessage(RECEIVE_ID, notificationContent);
    
    console.log('\n📋 发送结果');
    console.log('-'.repeat(40));
    
    if (sendResult.success) {
      console.log('✅ 任务完成通知发送成功！');
      console.log(`   消息ID: ${sendResult.data.message_id || 'N/A'}`);
      console.log('\n🎉 通知已成功发送到飞书群组！');
    } else {
      console.error('❌ 任务完成通知发送失败:', sendResult.error);
      console.log('\n⚠️  通知发送失败，请检查飞书配置。');
    }
  } catch (error) {
    console.error('❌ 测试出错:', error.message);
    console.error('错误详情:', error);
  }
  
  console.log('\n='.repeat(60));
  console.log('🎯 测试完成！');
  console.log('='.repeat(60));
}

// 执行测试
testTaskCompleteNotification().catch(console.error);
