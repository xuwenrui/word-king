#!/usr/bin/env node

/**
 * 任务完成通知测试脚本
 * 
 * 这个脚本用于测试飞书MCP服务器是否可以正常使用。
 * 它会模拟执行一个任务，然后发送任务完成的通知到飞书。
 */

import FeishuMessenger from './src/messenger.js';

console.log('🚀 任务完成通知测试');
console.log('='.repeat(60));

// 创建飞书客户端实例
const messenger = new FeishuMessenger();

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 模拟任务执行
 * @param {string} taskName 任务名称
 * @param {number} duration 任务持续时间（秒）
 * @returns {Promise<Object>} 任务执行结果
 */
async function executeTask(taskName, duration = 3) {
  console.log(`\n📋 开始执行任务: ${taskName}`);
  console.log(`⏱️  预计持续时间: ${duration} 秒`);
  
  // 模拟任务执行
  for (let i = 0; i < duration; i++) {
    process.stdout.write(`.`);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ 任务执行完成！');
  
  return {
    success: true,
    taskName: taskName,
    duration: duration,
    timestamp: new Date().toISOString(),
    result: '任务执行成功，所有步骤都已完成',
    details: {
      steps: 5,
      completed: 5,
      errors: 0,
      warnings: 0
    }
  };
}

/**
 * 发送任务完成通知
 * @param {Object} taskResult 任务执行结果
 */
async function sendTaskCompleteNotification(taskResult) {
  console.log(`\n📢 发送任务完成通知到飞书...`);
  
  try {
    // 创建通知卡片
    const notificationCard = messenger.createNotificationCard(
      '任务完成通知',
      `**任务名称**: ${taskResult.taskName}\n` +
      `**执行时间**: ${taskResult.duration} 秒\n` +
      `**完成时间**: ${new Date(taskResult.timestamp).toLocaleString()}\n` +
      `**执行结果**: ✅ 成功\n` +
      `**详细信息**: ${taskResult.result}\n` +
      `**步骤完成**: ${taskResult.details.completed}/${taskResult.details.steps}\n` +
      `**错误**: ${taskResult.details.errors}\n` +
      `**警告**: ${taskResult.details.warnings}`,
      [
        {
          text: '查看详情',
          type: 'primary',
          url: 'https://example.com/tasks/' + taskResult.taskName
        },
        {
          text: '返回',
          type: 'default',
          url: 'https://example.com'
        }
      ]
    );
    
    // 发送通知卡片
    const sendResult = await messenger.sendInteractiveCard(RECEIVE_ID, notificationCard);
    
    if (sendResult.success) {
      console.log('🎉 飞书通知发送成功！');
      console.log('📱 通知已发送到飞书群组');
      console.log(`   群组ID: ${RECEIVE_ID}`);
      console.log(`   消息ID: ${sendResult.data.message_id || 'N/A'}`);
      
      return true;
    } else {
      console.error('❌ 飞书通知发送失败:', sendResult.error);
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
  console.log('🎯 测试飞书MCP任务完成通知功能');
  console.log('='.repeat(60));
  
  // 1. 执行模拟任务
  const taskResult = await executeTask('系统维护任务', 2);
  
  // 2. 发送任务完成通知
  const notificationSent = await sendTaskCompleteNotification(taskResult);
  
  // 3. 测试结果
  console.log('\n📋 测试结果');
  console.log('-'.repeat(40));
  
  if (notificationSent) {
    console.log('✅ 测试通过！');
    console.log('   - 任务执行成功');
    console.log('   - 飞书通知发送成功');
    console.log('   - Feishu MCP 功能正常');
  } else {
    console.log('❌ 测试失败！');
    console.log('   - 任务执行成功');
    console.log('   - 飞书通知发送失败');
    console.log('   - Feishu MCP 功能异常');
  }
  
  console.log('\n🔧 排查建议');
  console.log('-'.repeat(40));
  console.log('1. 检查飞书凭证是否正确配置');
  console.log('2. 确认网络连接正常');
  console.log('3. 验证接收者ID是否有效');
  console.log('4. 查看飞书API文档了解错误原因');
  
  console.log('\n🎉 测试完成！');
  console.log('='.repeat(60));
}

// 执行主函数
main().catch(error => {
  console.error('❌ 测试过程中出错:', error);
  process.exit(1);
});
