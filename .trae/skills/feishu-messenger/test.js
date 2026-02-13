const { sendTextMessage, sendTaskCompleteNotification } = require('./index.js');

// 测试的接收者ID（群组ID）
const RECEIVE_ID = 'oc_800bf2ea6f68216ca816fd64d8d6d906';

/**
 * 测试文本消息发送
 */
async function testTextMessage() {
  console.log('🚀 测试文本消息发送');
  console.log('='.repeat(60));
  
  try {
    const result = await sendTextMessage(RECEIVE_ID, '这是一条测试消息\n\n**测试内容**: 飞书通知技能测试\n**测试时间**: ' + new Date().toLocaleString());
    
    if (result.success) {
      console.log('✅ 文本消息发送成功！');
      console.log(`   消息ID: ${result.data.message_id || 'N/A'}`);
    } else {
      console.error('❌ 文本消息发送失败:', result.error);
    }
  } catch (error) {
    console.error('❌ 测试出错:', error.message);
  }
  
  console.log('='.repeat(60));
}

/**
 * 测试任务完成通知
 */
async function testTaskCompleteNotification() {
  console.log('\n🚀 测试任务完成通知');
  console.log('='.repeat(60));
  
  try {
    const taskResult = {
      tasks: [
        { name: '提交代码', status: 'completed' },
        { name: '同步分支', status: 'completed' },
        { name: '发送通知', status: 'completed' }
      ],
      files: [
        'src/messenger.js',
        'test.js',
        'send-notification.js'
      ],
      branches: [
        'main',
        'develop',
        'feature/backend-bot',
        'feature/frontend-bot'
      ],
      status: 'success',
      message: '飞书通知技能测试完成，所有功能正常工作！'
    };
    
    const result = await sendTaskCompleteNotification(RECEIVE_ID, taskResult);
    
    if (result.success) {
      console.log('✅ 任务完成通知发送成功！');
      console.log(`   消息ID: ${result.data.message_id || 'N/A'}`);
    } else {
      console.error('❌ 任务完成通知发送失败:', result.error);
    }
  } catch (error) {
    console.error('❌ 测试出错:', error.message);
  }
  
  console.log('='.repeat(60));
}

/**
 * 运行所有测试
 */
async function runAllTests() {
  console.log('🎯 运行飞书通知技能测试');
  console.log('='.repeat(60));
  
  await testTextMessage();
  await testTaskCompleteNotification();
  
  console.log('\n🎯 所有测试完成！');
  console.log('='.repeat(60));
}

// 执行测试
runAllTests().catch(console.error);
