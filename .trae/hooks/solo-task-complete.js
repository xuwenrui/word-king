#!/usr/bin/env node

/**
 * Solo模式任务完成通知脚本
 *
 * 这个脚本用于在Solo模式下，每次任务完成后自动发送飞书通知
 */

import { sendTextMessage, sendTaskCompleteNotification } from '../skills/feishu-messenger/index.js';

// 飞书群组ID
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 发送Solo模式任务完成通知
 * @param {object} taskContext - 任务上下文
 */
async function sendSoloTaskCompleteNotification(taskContext = {}) {
  console.log('\n🚀 执行Solo模式任务完成通知');
  console.log('='.repeat(60));

  try {
    // 提取任务信息
    const {
      taskName = '未知任务',
      taskId = 'unknown',
      status = 'success',
      result = {},
      startTime,
      endTime,
      output = ''
    } = taskContext;

    // 计算执行时间
    const executionTime = startTime && endTime
      ? `${((endTime - startTime) / 1000).toFixed(2)}秒`
      : '未知';

    // 构建任务执行结果
    const taskResult = {
      tasks: [
        { name: taskName, status: status === 'success' ? 'completed' : 'failed' }
      ],
      files: result.files || [],
      branches: result.branches || [],
      status: status,
      message: `Solo模式任务 ${taskName} 执行完成，执行时间：${executionTime}`
    };

    console.log(`📢 发送Solo模式任务完成通知到飞书群组...`);
    console.log(`   群组ID: ${RECEIVE_ID}`);
    console.log(`   任务名称: ${taskName}`);
    console.log(`   任务状态: ${status === 'success' ? '✅ 成功' : '❌ 失败'}`);
    console.log(`   执行时间: ${executionTime}`);

    // 构建详细的通知内容
    let notificationContent = `Solo模式任务执行${status === 'success' ? '成功' : '失败'}\n` +
                             `\n` +
                             `**任务名称**: ${taskName}\n` +
                             `**任务ID**: ${taskId}\n` +
                             `**执行时间**: ${executionTime}\n` +
                             `**完成时间**: ${new Date().toLocaleString()}\n` +
                             `**执行状态**: ${status === 'success' ? '✅ 成功' : '❌ 失败'}\n`;

    // 添加任务输出（如果有）
    if (output && output.length > 0) {
      // 限制输出长度，避免消息过长
      const truncatedOutput = output.length > 500
        ? output.substring(0, 500) + '...'
        : output;
      notificationContent += `\n**任务输出**:\n\`\`\`\n${truncatedOutput}\n\`\`\``;
    }

    // 添加任务结果详情（如果有）
    if (Object.keys(result).length > 0) {
      notificationContent += `\n**任务结果**:\n`;
      for (const [key, value] of Object.entries(result)) {
        if (typeof value === 'string' && value.length > 100) {
          notificationContent += `- ${key}: ${value.substring(0, 100)}...\n`;
        } else if (Array.isArray(value)) {
          notificationContent += `- ${key}: [${value.slice(0, 5).join(', ')}${value.length > 5 ? ', ...' : ''}]\n`;
        } else {
          notificationContent += `- ${key}: ${value}\n`;
        }
      }
    }

    // 发送飞书通知
    console.log('\n📝 正在发送通知...');
    const notificationResult = await sendTextMessage(RECEIVE_ID, notificationContent);

    console.log('\n📋 通知发送结果');
    console.log('-'.repeat(40));

    if (notificationResult.success) {
      console.log('✅ 任务完成通知发送成功！');
      console.log(`   消息ID: ${notificationResult.data.message_id || 'N/A'}`);
      console.log('\n🎉 通知已成功发送到飞书群组！');
    } else {
      console.error('❌ 任务完成通知发送失败:', notificationResult.error);
      console.log('\n⚠️  任务已完成，但通知发送失败，请检查飞书配置。');
    }
  } catch (error) {
    console.error('❌ 执行任务完成通知时出错:', error.message);
    console.log('\n⚠️  任务已完成，但通知发送失败，请检查飞书配置。');
  }

  console.log('\n='.repeat(60));
  console.log('🎯 Solo模式任务完成通知执行完成！');
  console.log('='.repeat(60));
}

/**
 * 导出钩子函数
 */
export default sendSoloTaskCompleteNotification;

/**
 * 如果直接执行此脚本，则发送测试通知
 */
if (import.meta.url.startsWith('file://')) {
  // 测试任务上下文
  const testTaskContext = {
    taskName: '测试任务',
    taskId: 'test-task-123',
    status: 'success',
    result: {
      files: ['src/file1.js', 'src/file2.js'],
      branches: ['main', 'develop'],
      buildStatus: 'pass'
    },
    startTime: Date.now() - 5000,
    endTime: Date.now(),
    output: '任务执行成功！\n构建通过\n测试通过\n部署完成'
  };

  sendSoloTaskCompleteNotification(testTaskContext).catch(console.error);
}
