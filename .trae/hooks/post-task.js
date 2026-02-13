const { sendTaskCompleteNotification } = require('../skills/feishu-messenger/index.js');

// 飞书群组ID
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 任务完成后执行的钩子函数
 * @param {object} taskContext - 任务上下文
 */
async function postTaskHook(taskContext = {}) {
  console.log('\n🚀 执行任务完成钩子');
  console.log('='.repeat(60));
  
  try {
    // 提取任务信息
    const { 
      taskName = '未知任务',
      taskId = 'unknown',
      status = 'success',
      result = {},
      startTime,
      endTime
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
      message: `任务 ${taskName} 执行完成，执行时间：${executionTime}`
    };

    console.log(`📢 发送任务完成通知到飞书群组...`);
    console.log(`   群组ID: ${RECEIVE_ID}`);
    console.log(`   任务名称: ${taskName}`);
    console.log(`   任务状态: ${status === 'success' ? '✅ 成功' : '❌ 失败'}`);
    console.log(`   执行时间: ${executionTime}`);
    
    // 发送飞书通知
    const notificationResult = await sendTaskCompleteNotification(RECEIVE_ID, taskResult);
    
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
    console.error('❌ 执行任务完成钩子时出错:', error.message);
    console.log('\n⚠️  任务已完成，但通知发送失败，请检查飞书配置。');
  }
  
  console.log('\n='.repeat(60));
  console.log('🎯 任务完成钩子执行完成！');
  console.log('='.repeat(60));
}

/**
 * 导出钩子函数
 */
module.exports = postTaskHook;

/**
 * 如果直接执行此脚本，则发送测试通知
 */
if (require.main === module) {
  // 测试任务上下文
  const testTaskContext = {
    taskName: '测试任务',
    taskId: 'test-123',
    status: 'success',
    result: {
      files: [
        'src/test.js',
        'hooks/post-task.js'
      ],
      branches: [
        'main',
        'develop'
      ]
    },
    startTime: Date.now() - 5000,
    endTime: Date.now()
  };

  postTaskHook(testTaskContext).catch(console.error);
}
