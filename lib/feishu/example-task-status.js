#!/usr/bin/env node

/**
 * 任务执行后使用飞书MCP发送状态示例
 * 
 * 这个脚本演示了如何：
 * 1. 模拟任务执行
 * 2. 在任务完成后调用飞书MCP发送状态更新
 * 3. 处理不同的任务状态（成功、失败、警告）
 */

import FeishuMessenger from './src/messenger.js';

console.log('🚀 任务执行状态更新示例');
console.log('='.repeat(60));

// 创建飞书客户端实例
const messenger = new FeishuMessenger();

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 模拟任务执行
 * @param {string} taskName 任务名称
 * @param {number} duration 任务持续时间（秒）
 * @param {boolean} shouldFail 是否应该失败
 * @param {boolean} shouldWarn 是否应该警告
 * @returns {Promise<Object>} 任务执行结果
 */
async function executeTask(taskName, duration = 3, shouldFail = false, shouldWarn = false) {
  console.log(`\n📋 开始执行任务: ${taskName}`);
  console.log(`⏱️  预计持续时间: ${duration} 秒`);
  
  // 模拟任务执行
  await new Promise(resolve => setTimeout(resolve, duration * 1000));
  
  if (shouldFail) {
    console.log('❌ 任务执行失败');
    throw new Error(`任务 ${taskName} 执行失败：网络连接错误`);
  }
  
  if (shouldWarn) {
    console.log('⚠️  任务执行警告');
    return {
      success: true,
      warning: '部分数据处理失败，但任务整体完成',
      data: `任务 ${taskName} 的处理结果`,
      processedItems: 950,
      failedItems: 50
    };
  }
  
  console.log('✅ 任务执行成功');
  return {
    success: true,
    data: `任务 ${taskName} 的处理结果`,
    processedItems: 1000,
    failedItems: 0
  };
}

/**
 * 发送任务状态更新
 * @param {string} taskName 任务名称
 * @param {string} status 状态：success, error, warning, info
 * @param {Object} result 任务执行结果
 */
async function sendTaskStatus(taskName, status, result) {
  try {
    console.log(`\n📢 发送任务状态: ${status.toUpperCase()}`);
    
    let title, details;
    
    switch (status) {
      case 'success':
        title = `任务执行成功: ${taskName}`;
        details = `**任务名称**: ${taskName}\n` +
                  `**执行时间**: ${new Date().toLocaleString()}\n` +
                  `**执行结果**: ✅ 成功\n` +
                  `**处理数据**: ${result.processedItems} 条\n` +
                  `**失败数据**: ${result.failedItems} 条\n` +
                  `**成功率**: ${Math.round((result.processedItems / (result.processedItems + result.failedItems)) * 100)}%\n` +
                  `**结果详情**: ${result.data}`;
        break;
        
      case 'error':
        title = `任务执行失败: ${taskName}`;
        details = `**任务名称**: ${taskName}\n` +
                  `**执行时间**: ${new Date().toLocaleString()}\n` +
                  `**执行结果**: ❌ 失败\n` +
                  `**错误信息**: ${result.error}`;
        break;
        
      case 'warning':
        title = `任务执行警告: ${taskName}`;
        details = `**任务名称**: ${taskName}\n` +
                  `**执行时间**: ${new Date().toLocaleString()}\n` +
                  `**执行结果**: ⚠️  警告\n` +
                  `**处理数据**: ${result.processedItems} 条\n` +
                  `**失败数据**: ${result.failedItems} 条\n` +
                  `**成功率**: ${Math.round((result.processedItems / (result.processedItems + result.failedItems)) * 100)}%\n` +
                  `**警告信息**: ${result.warning}`;
        break;
        
      case 'info':
      default:
        title = `任务执行信息: ${taskName}`;
        details = `**任务名称**: ${taskName}\n` +
                  `**执行时间**: ${new Date().toLocaleString()}\n` +
                  `**执行状态**: ℹ️  进行中\n` +
                  `**信息**: ${result.info || '任务正在执行中...'}`;
        break;
    }
    
    // 使用飞书客户端发送状态卡片
    const card = messenger.createStatusCard(title, status, details);
    const sendResult = await messenger.sendInteractiveCard(RECEIVE_ID, card);
    
    if (sendResult.success) {
      console.log('✅ 状态卡片发送成功！');
      console.log(`   消息ID: ${sendResult.data.message_id}`);
    } else {
      console.error('❌ 状态卡片发送失败:', sendResult.error);
    }
    
  } catch (error) {
    console.error('❌ 发送状态时出错:', error.message);
  }
}

/**
 * 主函数 - 执行所有示例
 */
async function main() {
  console.log('\n🎯 示例 1: 任务执行成功');
  console.log('-'.repeat(40));
  try {
    const result = await executeTask('数据清洗任务', 2);
    await sendTaskStatus('数据清洗任务', 'success', result);
  } catch (error) {
    await sendTaskStatus('数据清洗任务', 'error', { error: error.message });
  }
  
  console.log('\n🎯 示例 2: 任务执行失败');
  console.log('-'.repeat(40));
  try {
    const result = await executeTask('模型训练任务', 2, true);
    await sendTaskStatus('模型训练任务', 'success', result);
  } catch (error) {
    await sendTaskStatus('模型训练任务', 'error', { error: error.message });
  }
  
  console.log('\n🎯 示例 3: 任务执行警告');
  console.log('-'.repeat(40));
  try {
    const result = await executeTask('文件同步任务', 2, false, true);
    await sendTaskStatus('文件同步任务', 'warning', result);
  } catch (error) {
    await sendTaskStatus('文件同步任务', 'error', { error: error.message });
  }
  
  console.log('\n🎯 示例 4: 批量任务执行');
  console.log('-'.repeat(40));
  try {
    const batchResults = [];
    
    // 执行多个子任务
    for (let i = 1; i <= 3; i++) {
      const subTaskResult = await executeTask(`子任务 ${i}`, 1, i === 2); // 第二个子任务失败
      batchResults.push(subTaskResult);
    }
    
    // 计算整体状态
    const successCount = batchResults.filter(r => r.success).length;
    const totalCount = batchResults.length;
    const overallStatus = successCount === totalCount ? 'success' : successCount > 0 ? 'warning' : 'error';
    
    // 发送批量任务状态
    await sendTaskStatus('批量处理任务', overallStatus, {
      success: successCount === totalCount,
      processedItems: totalCount,
      failedItems: totalCount - successCount,
      warning: successCount > 0 ? `部分任务失败，成功率：${Math.round((successCount/totalCount)*100)}%` : undefined,
      error: successCount === 0 ? '所有任务都失败了' : undefined
    });
    
  } catch (error) {
    await sendTaskStatus('批量处理任务', 'error', { error: error.message });
  }
  
  console.log('\n='.repeat(60));
  console.log('🚀 所有示例执行完成！');
  console.log('='.repeat(60));
}

// 执行主函数
main().catch(console.error);
